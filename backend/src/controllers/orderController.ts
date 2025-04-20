import { Request, Response } from "express";

import orderSchema from "../schemas/order";

import OrderService from "../services/orderService";

import { BadRequestError } from "../errors/HTTPError";

const OrderController = {
  createOrder: async (req: Request, res: Response) => {
    const { data, error } = orderSchema.create.safeParse(req.body);

    if (error) {
      throw new BadRequestError("Invalid order data");
    }

    const orderId = await OrderService.createOrder(data);

    res
      .status(201)
      .json({ message: "Order created successfully", id: orderId });
  },
  registerPayment: async (req: Request, res: Response) => {
    const { data, error: queryError } = orderSchema.registerPayment.safeParse(
      req.query
    );

    if (queryError) {
      res.status(400).json("A valid order id is required");
      return;
    }

    await OrderService.registerPayment(data.id);

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
