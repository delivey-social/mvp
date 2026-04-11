import React, { createContext } from "react";
import { PaymentMethods } from "../../types/Order";

// TODO: Remove this interface *use shared
export interface Order {
  items: {
    id: string;
    quantity: number;
  }[];
  user: {
    email: string;
    phoneNumber: string;
    address: string;
    neighborhoodId: string;
  };
  observations?: string;
}

interface IOrderContext {
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  items: Order["items"];
  user: Order["user"];
  setItems: React.Dispatch<React.SetStateAction<Order["items"]>>;
  setUserProperty(key: keyof Order["user"], value: string): void;
  sendOrder: (
    user: Order["user"],
    payment_method: PaymentMethods,
    observation?: string,
  ) => Promise<void>;
}

export const OrderContext = createContext({} as IOrderContext);
