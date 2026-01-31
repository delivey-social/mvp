import { EnrichedOrderDTO, Order } from "./types.d";
import { OrderStatus } from "./OrderStatus.d";
import { CRUDRepository } from "@/utils/CRUD";

export interface OrderRepository
  extends CRUDRepository<Order, EnrichedOrderDTO, Partial<EnrichedOrderDTO>> {
  changeStatus(id: string, status: OrderStatus): Promise<void>;
}
