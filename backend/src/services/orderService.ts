import catchError from "../errors/catchError";
import { BadRequestError, ResourceNotFoundError } from "../errors/HTTPError";

import { CreateOrderDTO } from "../types/order";
import OrderModel, { OrderDocument } from "../models/OrderModel";

import EmailService from "./emailService";

const OrderService = {
  getOrder: async (id: string): Promise<OrderDocument | null> => {
    const [error, order] = await catchError(
      OrderModel.findById(id).lean<OrderDocument>(),
    );
    if (error) {
      throw new Error("Error fetching: Order not found");
    }

    return order ?? null;
  },
  createOrder: async (data: CreateOrderDTO) => {
    const order = await OrderModel.create(data);
    await order.save();

    if (order.paymentMethod !== "PIX") {
      const [emailError] = await catchError(
        EmailService.sendNewOrderToRestaurantEmail(order.id, order.items),
      );

      if (emailError) {
        // TODO: Try to resend the email before throwing an error
        console.error(emailError);
        throw new Error("Error sending email (order was created)");
      }

      return order.id;
    }

    const [emailError] = await catchError(
      EmailService.sendNewOrderEmail(order.id, order.user, order.totalAmount),
    );

    if (emailError) {
      // TODO: Try to resend the email before throwing an error
      console.error(emailError);
      throw new Error("Error sending email (order was created)");
    }

    return order.id;
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

    const [emailError] = await catchError(
      EmailService.sendDeliveryEmail({
        orderId: order.id,
        address: order.user.address,
      }),
    );

    if (emailError) {
      // TODO: Try to resend the email before throwing an error
      console.error(emailError);
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
        "Order not ready for delivered or already delivered",
      );
    }

    await order.updateOne({ status: "DELIVERED" });
  },
};

export default OrderService;
