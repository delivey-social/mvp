export interface CreateOrderDTO {
  items: {
    id: string;
    quantity: number;
  }[];
  user: {
    email: string;
    phone_number: string;
    address: string;
  };
  neighborhood_id: string;
  payment_method: PaymentMethods;
  observation?: string | undefined;
}

export enum PaymentMethods {
  Pix = "PIX",
  CartaoDebito = "DEBIT_CARD",
  CartaoCredito = "CREDIT_CARD",
}
