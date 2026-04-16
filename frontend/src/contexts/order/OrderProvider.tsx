import axios from "axios";
import { useEffect, useState } from "react";
import { Order, OrderContext } from "./OrderContext";
import { PaymentMethods } from "../../types/Order";
import { CreateOrderDTO } from "@shared/types/dtos/order";

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const initialItems = sessionStorage.getItem("items")
    ? JSON.parse(sessionStorage.getItem("items")!)
    : [];
  const initialUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : {
        email: "",
        phoneNumber: "",
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
    paymentMethod: PaymentMethods,
    observation?: string,
  ) {
    const data: CreateOrderDTO = {
      items: items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
      user,
      observation,
      neighborhoodId: user.neighborhoodId,
      paymentMethod,
    };

    await axios.post<void, CreateOrderDTO>(
      `${import.meta.env.VITE_BACKEND_URL}/orders`,
      data,
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
