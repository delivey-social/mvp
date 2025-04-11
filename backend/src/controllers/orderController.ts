import { Request, Response } from "express";

import orderSchema from "../schemas/order";
import catchError from "../errors/catchError";

import NeighborhoodService from "../services/neighborhoodService";
import OrderService from "../services/orderService";
import EmailService from "../services/emailService";

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
};

export default OrderController;
