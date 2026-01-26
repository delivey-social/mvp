import { CreateOrderRequest, Order } from "../types/Order";
import { OrderRepository as IOrderRepository } from "./OrderRepository.d";
import OrderModel from "../models/OrderModel";
import { OrderStatus } from "../types/OrderStatus";

export class OrderMongoRepository implements IOrderRepository {
  constructor(private model: typeof OrderModel) {}

  async findById(id: string): Promise<Order | null> {
    const order = await this.model.findById(id).lean<Order>();

    return order ?? null;
  }

  async create(data: CreateOrderRequest): Promise<Order> {
    const order = await this.model.create(data);
    await order.save();

    return order;
  }

  async changeStatus(id: string, status: OrderStatus): Promise<void> {
    await this.model.findByIdAndUpdate(id, {
      status: status,
    });
  }
}
