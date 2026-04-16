import { PaymentMethods } from "../PaymentMethods";

export type CreateOrderDTO = {
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

export type UpdateOrderDTO = Partial<CreateOrderDTO>;
