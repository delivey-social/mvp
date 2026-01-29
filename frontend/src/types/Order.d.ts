export type PaymentMethods = "PIX" | "CREDIT_CARD" | "DEBIT_CARD";

export interface CreateOrder {
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
