import OrderModel from "../models/OrderModel";
import { CreateOrder } from "../types/order";

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
};

export default OrderService;
