import { PaymentMethods } from "./PaymentMethods";

import { z } from "zod";
import orderSchema from "../schemas/order";

export type CreateOrderDTO = z.infer<typeof orderSchema.create>;

export type Order = {
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
