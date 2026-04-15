export interface CreateOrderDTO {
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
  paymentMethod: PaymentMethods;
  observation?: string | undefined;
}

export enum PaymentMethods {
  Pix = "PIX",
  CartaoDebito = "DEBIT_CARD",
  CartaoCredito = "CREDIT_CARD",
}
