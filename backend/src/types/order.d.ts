export interface CreateOrder {
  deliveryFee: number;
  items: {
    id: string;
    quantity: number;
  }[];
  user: {
    email: string;
    phone_number: string;
    address: string;
  };
  observation?: string;
}
