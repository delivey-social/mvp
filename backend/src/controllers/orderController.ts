import { MenuItem } from "../../public/MenuItems";

import { Request, Response } from "express";

import orderSchema from "../schemas/order";

import NeighborhoodService from "../services/neighborhoodService";
import OrderService from "../services/orderService";
import EmailService from "../services/emailService";

import OrderModel from "../models/OrderModel";

import menuJSON from "../../public/menu_items.json";

import catchError from "../errors/catchError";
import { BadRequestError, ResourceNotFoundError } from "../errors/HTTPError";
import { OrderItem } from "../types/order";

const OrderController = {
  createOrder: async (req: Request, res: Response) => {
    const { data, error } = orderSchema.create.safeParse(req.body);

    if (error) {
      throw new BadRequestError("Invalid order data");
    }

    const deliveryFee = await NeighborhoodService.getDeliveryFee(
      data.neighborhoodId,
    );

    const orderData = {
      ...data,
      deliveryFee,
    };
    const orderId = await OrderService.createOrder(orderData);

    res
      .status(201)
      .json({ message: "Order created successfully", id: orderId });
  },
  registerPayment: async (req: Request, res: Response) => {
    const { data, error: queryError } = orderSchema.registerPayment.safeParse(
      req.query,
    );

    if (queryError) {
      res.status(400).json("A valid order id is required");
      return;
    }

    const { id } = data;
    const order = await OrderModel.findById(id).select("status items id");

    if (!order) throw new ResourceNotFoundError("Order");

    const { status, items } = order;

    if (status !== "WAITING_PAYMENT") {
      res.status(400).json("Order already paid!");
      return;
    }

    // Populates the items with the menu items
    const populatedItems: OrderItem[] = items.map((item) => {
      const menu = Object.values(menuJSON).flat();
      const menuItem = menu.find(
        (menuItem) => item.id === menuItem.id,
      ) as MenuItem;

      return {
        ...menuItem,
        quantity: item.quantity,
        priceSnapshot: item.priceSnapshot,
      };
    });

    const [updateError] = await catchError(OrderService.registerPayment(id));

    if (updateError) {
      throw new Error("Error updating order status");
    }

    const [error] = await catchError(
      EmailService.sendNewOrderToRestaurantEmail(order.id, populatedItems),
    );

    if (error) {
      throw new Error("Error sending email to restaurant");
    }

    res.send("Payment confirmed");
  },
  readyForDelivery: async (req: Request, res: Response) => {
    const { data, error } = orderSchema.readyForDelivery.safeParse(req.query);

    if (error) {
      throw new BadRequestError("Invalid order id");
    }

    await OrderService.readyForDelivery(data.id);

    res.send("Order is ready for delivery");
  },
  delivered: async (req: Request, res: Response) => {
    const { data, error } = orderSchema.delivered.safeParse(req.query);

    if (error) {
      throw new BadRequestError("Invalid order id");
    }

    await OrderService.delivered(data.id);

    res.send("Order has been delivered");
  },
};

export default OrderController;
