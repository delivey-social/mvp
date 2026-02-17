import { CreateOrderRequest, EnrichedOrderDTO, Order } from "./types.d";
import { OrderRepository as IOrderRepository } from "./repository.d";
import { OrderStatus } from "./OrderStatus.d";

import OrderModel from "./model";

import cleanMongooseObject from "../../utils/cleanMongooseObject";
import { ResourceNotFoundError } from "@/errors/HTTPError";

export class OrderMongoRepository implements IOrderRepository {
  constructor(private model: typeof OrderModel) {}

  async findById(id: string): Promise<Order> {
    const order = await this.model.findById(id);

    if (!order) {
      throw new ResourceNotFoundError("order");
    }

    return cleanMongooseObject(order);
  }

  async create(data: CreateOrderRequest): Promise<Order> {
    const order = await this.model.create(data);
    await order.save();

    return cleanMongooseObject(order);
  }

  async changeStatus(id: string, status: OrderStatus): Promise<void> {
    await this.model.findByIdAndUpdate(id, {
      status: status,
    });
  }

  async list(): Promise<Order[]> {
    const items = await this.model.find({});

    const res = items.map((i) => cleanMongooseObject<Order>(i));

    return res;
  }

  async delete(id: string): Promise<boolean> {
    const resource = await this.model.findByIdAndDelete(id);

    return Boolean(resource);
  }

  async update(id: string, data: Partial<EnrichedOrderDTO>): Promise<Order> {
    return (await this.model.findByIdAndUpdate(id, data))!;
  }
}
