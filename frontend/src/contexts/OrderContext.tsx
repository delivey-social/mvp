import React, { createContext, useState } from "react";

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
  const [items, setItems] = useState<Order["items"]>([]);
  const [user, setUser] = useState<Order["user"]>({
    email: "",
    phone_number: "",
    address: "",
  });

  return (
    <OrderContext.Provider value={{ items, setItems, user, setUser }}>
      {children}
    </OrderContext.Provider>
  );
};
