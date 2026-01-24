import { CreateOrderDTO, Order } from "../types/order";
import { OrderRepository as IOrderRepository } from "./OrderRepository.d";
import OrderModel from "../models/OrderModel";
import { OrderStatus } from "../types/OrderStatus";

export class OrderMongoRepository implements IOrderRepository {
  constructor(private model: typeof OrderModel) {}

  async findById(id: string): Promise<Order | null> {
    const order = await this.model.findById(id).lean<Order>();

    return order ?? null;
  }

  async create(data: CreateOrderDTO): Promise<string> {
    const order = await this.model.create(data);
    await order.save();

    return order.id;
  }

  async changeStatus(id: string, status: OrderStatus): Promise<void> {
    await this.model.findByIdAndUpdate(id, {
      status: status,
    });
  }
}
