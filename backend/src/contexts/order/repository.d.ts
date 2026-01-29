import { EnrichedOrderDTO, Order } from "./types.d";
import { OrderStatus } from "./OrderStatus.d";

export interface OrderRepository {
  list(): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  create(data: EnrichedOrderDTO): Promise<Order>;
  changeStatus(id: string, status: OrderStatus): Promise<void>;
}
