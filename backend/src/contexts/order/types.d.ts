import { PaymentMethods } from "./PaymentMethods";

import { z } from "zod";
import { OrderStatus } from "./OrderStatus";
import orderSchema from "./schema";

export type CreateOrderRequest = z.infer<typeof orderSchema.create>;

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
