import { OrderStatus } from "../types/OrderStatus.d";
import { CreateOrderDTO, Order } from "../types/Order";

import { OrderRepository } from "../repositories/OrderRepository.d";
import { OrderService as IOrderService, Result } from "./OrderService.d";

import { Event, EventPublisher } from "../types/Events.d";

export class OrderService implements IOrderService {
  constructor(
    private repository: OrderRepository,
    private eventPublisher: EventPublisher,
  ) {}

  async getOrderById(id: string): Promise<Order | null> {
    return await this.repository.findById(id);
  }

  async createOrder(data: CreateOrderDTO): Promise<string> {
    const order = await this.repository.create(data);

    this.eventPublisher.publish(Event.OrderCreated, order);

    return order.id;
  }

  async registerPayment(id: string): Promise<Result> {
    const order = await this.repository.findById(id);

    if (!order) {
      return {
        success: false,
        message: "Order not found",
      };
    }

    if (order.status !== OrderStatus.WaitingPayment) {
      return {
        success: false,
        message: "Invalid status",
      };
    }

    await this.repository.changeStatus(id, OrderStatus.Preparing);

    this.eventPublisher.publish(Event.OrderPaid, order);

    return { success: true };
  }

  async readyForDelivery(id: string): Promise<Result> {
    const order = await this.repository.findById(id);

    if (!order) {
      return {
        success: false,
        message: "Order not found",
      };
    }

    if (order.status !== OrderStatus.Preparing) {
      return {
        success: false,
        message: "Invalid status",
      };
    }

    await this.repository.changeStatus(id, OrderStatus.ReadyForDelivery);

    this.eventPublisher.publish(Event.OrderReadyForDelivery, order);

    return { success: true };
  }

  async delivered(id: string): Promise<Result> {
    const order = await this.repository.findById(id);

    if (!order) {
      return {
        success: false,
        message: "Order not found",
      };
    }

    if (order.status !== OrderStatus.ReadyForDelivery) {
      return {
        success: false,
        message: "Invalid status",
      };
    }

    await this.repository.changeStatus(id, OrderStatus.Finished);

    this.eventPublisher.publish(Event.OrderFinished, order);

    return { success: true };
  }
}
