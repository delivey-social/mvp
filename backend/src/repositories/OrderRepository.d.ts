import { OrderStatus } from "../types/OrderStatus";
import { EnrichedOrderDTO, Order } from "../types/Order";

export interface OrderRepository {
  findById(id: string): Promise<Order | null>;
  create(data: EnrichedOrderDTO): Promise<Order>;
  changeStatus(id: string, status: OrderStatus): Promise<void>;
}
