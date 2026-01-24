import { CreateOrderDTO, Order } from "../types/order";

export type Result =
  | {
      success: false;
      message: string;
    }
  | {
      success: true;
    };

export interface OrderService {
  getOrderById: (id: string) => Promise<Order | null>;
  createOrder: (data: CreateOrderDTO) => Promise<string>;
  registerPayment: (id: string) => Promise<Result>;
  readyForDelivery: (id: string) => Promise<Result>;
  delivered: (id: string) => Promise<Result>;
}
