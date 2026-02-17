import { CRUDService } from "@/utils/CRUD";
import { Order } from "./types.d";
import { CreateOrderRequest, UpdateOrderRequest } from "@shared/types/order";

export type Result =
  | {
      success: false;
      message: string;
    }
  | {
      success: true;
    };

export interface OrderService
  extends CRUDService<Order, CreateOrderRequest, UpdateOrderRequest> {
  registerPayment: (id: string) => Promise<Result>;
  readyForDelivery: (id: string) => Promise<Result>;
  delivered: (id: string) => Promise<Result>;
}
