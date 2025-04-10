import OrderModel from "../models/OrderModel";
import { CreateOrder } from "../types/order";

const OrderService = {
  createOrder: async (data: CreateOrder) => {
    const order = await OrderModel.create(data);
    await order.save();

    return order;
  },
};

export default OrderService;
