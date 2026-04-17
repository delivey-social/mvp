import { OrderStatus } from "./OrderStatus";

import { CreateOrderDTO } from "shared/types/dtos/order";
import { PaymentMethods } from "shared/types/PaymentMethods";

export type EnrichedOrderDTO = CreateOrderDTO & {
  items: OrderItem[];
  deliveryFee: number;
};

export type Order = {
  id: string;
  items: OrderItem[];
  user: OrderUser;
  observation?: string;
  status: OrderStatus;
  paymentMethod: PaymentMethods;
  appFee: number;
  itemsTotal: number;
  deliveryFee: number;
  totalAmount: number;
};

export type OrderItem = {
  id: string;
  quantity: number;
  priceSnapshot: number;
};

export type OrderUser = {
  email: string;
  phoneNumber: string;
  address: string;
};
