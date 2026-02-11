import { PaymentMethods } from "./PaymentMethods";

import { OrderStatus } from "./OrderStatus";

export type CreateOrderRequest = {
  items: {
    id: string;
    quantity: number;
  }[];
  user: {
    email: string;
    phoneNumber: string;
    address: string;
  };
  neighborhoodId: string;
  observation?: string;
  paymentMethod: PaymentMethods;
};
export type UpdateOrderRequest = Partial<CreateOrderRequest>;

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
