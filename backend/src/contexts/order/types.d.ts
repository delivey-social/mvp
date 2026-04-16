import { OrderStatus } from "./OrderStatus";

import { CreateOrderRequest } from "@shared/types/order";
import { PaymentMethods } from "@shared/types/PaymentMethods";

export type EnrichedOrderDTO = CreateOrderRequest & {
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
