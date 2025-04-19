import OrderModel, { CreateOrder } from "../models/OrderModel";

const OrderRepository = {
  create: async (data: CreateOrder) => {
    const order = await OrderModel.create(data);
    await order.save();

    return order;
  },
};

export default OrderRepository;
