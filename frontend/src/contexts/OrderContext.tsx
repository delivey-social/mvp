import React, { createContext, useEffect, useState } from "react";

interface Order {
  items: {
    id: number;
    quantity: number;
  }[];
  user: {
    email: string;
    phone_number: string;
    address: string;
    observations?: string;
  };
}

interface OrderContextProps {
  items: Order["items"];
  user: Order["user"];
  setItems: React.Dispatch<React.SetStateAction<Order["items"]>>;
  setUser: React.Dispatch<React.SetStateAction<Order["user"]>>;
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

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  useEffect(() => {
    sessionStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <OrderContext.Provider value={{ items, setItems, user, setUser }}>
      {children}
    </OrderContext.Provider>
  );
};
