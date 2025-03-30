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
  observations?: string;
}

interface OrderContextProps {
  items: Order["items"];
  user: Order["user"];
  setItems: React.Dispatch<React.SetStateAction<Order["items"]>>;
  setUser: React.Dispatch<React.SetStateAction<Order["user"]>>;
  sendOrder: (user: Order["user"], observation?: string) => Promise<void>;
}

export const OrderContext = createContext({} as OrderContextProps);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const initialItems = sessionStorage.getItem("items")
    ? JSON.parse(sessionStorage.getItem("items")!)
    : [];
  const initialUser = sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user")!)
    : {
        email: "",
        phone_number: "",
        address: "",
      };

  const [items, setItems] = useState<Order["items"]>(initialItems);
  const [user, setUser] = useState<Order["user"]>(initialUser);
  //   const [observation, setObservation] = useState<string | undefined>(undefined);

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  useEffect(() => {
    sessionStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  async function sendOrder(
    user: { email: string; phone_number: string; address: string },
    observation?: string
  ) {
    await axios.post("http://localhost:3000/orders", {
      items: items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
      user,
      observation,
    });
  }

  return (
    <OrderContext.Provider
      value={{ items, setItems, user, setUser, sendOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};
