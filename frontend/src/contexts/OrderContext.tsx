import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { CreateOrder, PaymentMethods } from "../types/Order";

interface Order {
  items: {
    id: string;
    quantity: number;
  }[];
  user: {
    email: string;
    phone_number: string;
    address: string;
    neighborhood_id: string;
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
    observation?: string
  ) => Promise<void>;
}

export const OrderContext = createContext({} as IOrderContext);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const initialItems = sessionStorage.getItem("items")
    ? JSON.parse(sessionStorage.getItem("items")!)
    : [];
  const initialUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : {
        email: "",
        phone_number: "",
        address: "",
      };
  const [total, setTotal] = useState<number>(0);

  const [items, setItems] = useState<Order["items"]>(initialItems);
  const [user, setUser] = useState<Order["user"]>(initialUser);

  useEffect(() => {
    sessionStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  async function sendOrder(
    user: Order["user"],
    payment_method: PaymentMethods,
    observation?: string
  ) {
    const data: CreateOrder = {
      items: items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
      user,
      observation,
      neighborhood_id: user.neighborhood_id,
      payment_method,
    };

    await axios.post<void, CreateOrder>(
      `${import.meta.env.VITE_BACKEND_URL}/orders`,
      data
    );

    localStorage.setItem("user", JSON.stringify(user));
  }

  async function setUserProperty(key: keyof Order["user"], value: string) {
    setUser((prevUser) => ({ ...prevUser, [key]: value }));
  }

  return (
    <OrderContext.Provider
      value={{
        items,
        setItems,
        user,
        setUserProperty,
        sendOrder,
        total,
        setTotal,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
