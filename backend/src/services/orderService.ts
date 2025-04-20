import catchError from "../errors/catchError";
import { BadRequestError, ResourceNotFoundError } from "../errors/HTTPError";

import { CreateOrder } from "../types/order";
import OrderModel from "../models/OrderModel";

import EmailService from "./emailService";
import OrderRepository from "../repositories/orderRepository";
import { PaymentMethods } from "../types/PaymentMethods";

import NeighborhoodService from "./neighborhoodService";
import MenuItemsService from "./menuItemsService";

const OrderService = {
  createOrder: async (data: CreateOrder) => {
    const { items, neighborhood_id, payment_method, user, observation } = data;

    const deliveryFee =
      await NeighborhoodService.getDeliveryFee(neighborhood_id);

    const itemsPrice = await MenuItemsService.getItemsTotal(items);

    const order = await OrderRepository.create({
      items,
      payment_method: PaymentMethods[payment_method],
      user,
      observation,
      priceDetails: {
        deliveryFee,
        itemsPrice,
        appFee: itemsPrice * 0.1,
      },
    });

    const [emailError] = await catchError(
      EmailService.sendNewOrderEmail(
        order.id,
        order.user,
        {
          appFee: order.priceDetails.appFee,
          deliveryFee: order.priceDetails.deliveryFee,
          itemsTotal: order.priceDetails.itemsPrice,
          total: order.orderTotal,
        },
        order.payment_method
      )
    );

    if (emailError) {
      // TODO: Try to resend the email before throwing an error
      console.error(emailError);
      throw new Error("Error sending email (order was created)");
    }

    return order.id;
  },
  registerPayment: async (id: string) => {
    const order = await OrderModel.findById(id).select("status items id");

    if (!order) throw new ResourceNotFoundError("Order");

    const { status, items } = order;

    if (status !== "WAITING_PAYMENT") {
      throw new BadRequestError("Order already paid!");
    }

    await OrderModel.findByIdAndUpdate(id, {
      status: "PREPARING",
    });

    const [error] = await catchError(
      EmailService.sendNewOrderToRestaurantEmail(order.id, items)
    );

    if (error) {
      throw new Error("Error sending email to restaurant");
    }
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
      })
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
        "Order not ready for delivered or already delivered"
      );
    }

    await order.updateOne({ status: "DELIVERED" });
  },
};

export default OrderService;
