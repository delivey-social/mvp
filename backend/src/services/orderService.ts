import catchError from "../errors/catchError";
import { BadRequestError, ResourceNotFoundError } from "../errors/HTTPError";

import { CreateOrder } from "../types/order";
import OrderModel from "../models/OrderModel";

import EmailService from "./emailService";

const OrderService = {
  createOrder: async (data: CreateOrder) => {
    const order = await OrderModel.create(data);
    await order.save();

    return order;
  },
  registerPayment: async (id: string) => {
    await OrderModel.findByIdAndUpdate(id, {
      status: "PREPARING",
    });
  },
  readyForDelivery: async (id: string) => {
    const order = await OrderModel.findByIdAndUpdate(id, {
      status: "READY_FOR_DELIVERY",
    });

    if (!order) {
      throw new ResourceNotFoundError("Order");
    }

    const [error] = await catchError(
      EmailService.sendDeliveryEmail({
        orderId: order.id,
        address: order.user.address,
      })
    );

    if (error) {
      throw new Error("Error sending email (order was updated)");
    }
  },
  delivered: async (id: string) => {
    const order = await OrderModel.findById(id).select("status");

    if (!order) {
      throw new ResourceNotFoundError("Order");
    }

    if (order.status !== "READY_FOR_DELIVERY") {
      throw new BadRequestError(
        "Order not ready for delivered or already delivered"
      );
    }

    await order.updateOne({ status: "DELIVERED" });
  },
};

export default OrderService;
