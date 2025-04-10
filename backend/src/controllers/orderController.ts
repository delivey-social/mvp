import { Request, Response } from "express";

import orderSchema from "../schemas/order";
import handleError from "../utils/handleError";

import NeighborhoodService from "../services/NeighborhoodService";
import OrderService from "../services/OrderService";
import EmailService from "../services/emailService";

const OrderController = {
  createOrder: async (req: Request, res: Response) => {
    const body = req.body;
    const { success, data } = orderSchema.create.safeParse(body);

    if (!success) {
      res.status(400).json("Invalid request body");
      return;
    }

    const [error, deliveryFee] = await handleError(
      (() => NeighborhoodService.getDeliveryFee(data.neighborhood_id))()
    );

    if (error) {
      res.status(400).json("Neighborhood not found");
      return;
    }

    const orderData = {
      ...data,
      deliveryFee,
    };
    const [createOrderError, order] = await handleError(
      (() => OrderService.createOrder(orderData))()
    );

    if (createOrderError) {
      res.status(400).json("Error creating order");
      return;
    }

    const [sendEmailError] = await handleError(
      (() =>
        EmailService.sendNewOrderEmail(
          order.id,
          order.user,
          order.totalAmount
        ))()
    );

    if (sendEmailError) {
      // TODO: Retry resending the email
      res.status(500).send("Order created, but email couldn't be sent");
      return;
    }

    res
      .status(201)
      .json({ message: "Order created successfully", id: order.id });
  },
};

export default OrderController;
