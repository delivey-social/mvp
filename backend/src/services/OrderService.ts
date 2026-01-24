import { CreateOrderDTO, Order } from "../types/order";
import { OrderService as IOrderService, Result } from "./OrderService.d";

enum OrderStatus {
  WaitingPayment = "WAITING_PAYMENT",
  Preparing = "PREPARING",
  ReadyForDelivery = "READY_FOR_DELIVERY",
  Finished = "Finished",
}

export interface OrderRepository {
  findById(id: string): Promise<Order | null>;
  create(data: CreateOrderDTO): Promise<string>;
  changeStatus(id: string, status: OrderStatus): Promise<void>;
}

export class OrderService implements IOrderService {
  constructor(private repository: OrderRepository) {}

  async getOrderById(id: string): Promise<Order | null> {
    return await this.repository.findById(id);
  }

  async createOrder(data: CreateOrderDTO): Promise<string> {
    return await this.repository.create(data);
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

    return { success: true };
  }
}
