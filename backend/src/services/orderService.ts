import catchError from "../errors/catchError";
import { BadRequestError } from "../errors/HTTPError";
import OrderModel from "../models/OrderModel";
import { CreateOrder } from "../types/order";
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
      throw new BadRequestError("Order not found");
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
};

export default OrderService;
