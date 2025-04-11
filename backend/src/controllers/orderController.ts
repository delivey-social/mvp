import { Request, Response } from "express";

import orderSchema from "../schemas/order";

import NeighborhoodService from "../services/neighborhoodService";
import OrderService from "../services/orderService";
import EmailService from "../services/emailService";

import OrderModel from "../models/OrderModel";

import menuJSON from "../../public/menu_items.json";

import { IMenuItem } from "../../public/MenuItems";
import catchError from "../errors/catchError";
import { BadRequestError, ResourceNotFoundError } from "../errors/HTTPError";

const OrderController = {
  createOrder: async (req: Request, res: Response) => {
    const body = req.body;
    const { success, data } = orderSchema.create.safeParse(body);

    if (!success) {
      res.status(400).json("Invalid request body");
      return;
    }

    const deliveryFee = await NeighborhoodService.getDeliveryFee(
      data.neighborhood_id
    );

    const orderData = {
      ...data,
      deliveryFee,
    };
    const order = await OrderService.createOrder(orderData);

    const [sendEmailError] = await catchError(
      EmailService.sendNewOrderEmail(order.id, order.user, order.totalAmount)
    );

    if (sendEmailError) {
      // TODO: Retry to send the email the email
      throw new Error("Error sending email (order was created)");
    }

    res
      .status(201)
      .json({ message: "Order created successfully", id: order.id });
  },
  registerPayment: async (req: Request, res: Response) => {
    const { data, error: queryError } = orderSchema.registerPayment.safeParse(
      req.query
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
    const populatedItems = items.map((item) => {
      const menu = [...menuJSON.salgados, ...menuJSON.doces];
      const menuItem = menu.find(
        (menuItem) => item.id === menuItem.id
      ) as IMenuItem;

      return { ...menuItem, quantity: item.quantity };
    });

    const [updateError] = await catchError(OrderService.registerPayment(id));

    if (updateError) {
      throw new Error("Error updating order status");
    }

    const [error] = await catchError(
      EmailService.sendNewOrderToRestaurantEmail(order.id, populatedItems)
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
};

export default OrderController;
