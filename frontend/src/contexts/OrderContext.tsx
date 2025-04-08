import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

interface Order {
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
  observations?: string;
}

interface IOrderContext {
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  items: Order["items"];
  user: Order["user"];
  setItems: React.Dispatch<React.SetStateAction<Order["items"]>>;
  setUser: React.Dispatch<React.SetStateAction<Order["user"]>>;
  sendOrder: (
    user: Order["user"],
    neighborhood_id: string,
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
  //   const [observation, setObservation] = useState<string | undefined>(undefined);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  useEffect(() => {
    sessionStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  async function sendOrder(
    user: { email: string; phone_number: string; address: string },
    neighborhood_id: string,
    observation?: string
  ) {
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/orders`, {
      items: items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
      user,
      observation,
      neighborhood_id,
    });
  }

  return (
    <OrderContext.Provider
      value={{ items, setItems, user, setUser, sendOrder, total, setTotal }}
    >
      {children}
    </OrderContext.Provider>
  );
};
