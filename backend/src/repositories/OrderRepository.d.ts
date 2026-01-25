import { OrderStatus } from "../types/OrderStatus";
import { CreateOrderDTO, Order } from "../types/order";

export interface OrderRepository {
  findById(id: string): Promise<Order | null>;
  create(data: CreateOrderDTO): Promise<Order>;
  changeStatus(id: string, status: OrderStatus): Promise<void>;
}
