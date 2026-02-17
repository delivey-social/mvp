import { PaymentMethods } from "./PaymentMethods";

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
