import menu from "../../../menu_items.json";

import { useNavigate } from "react-router";

import { useContext } from "react";
import { OrderContext } from "../../../contexts/order/OrderContext";
import OrderSummary from "./order-summary";
import Button from "@/components/ui/button";

export default function Footer() {
  const { items } = useContext(OrderContext);
  const navigate = useNavigate();

  const totalProducts = items.reduce((acc, product) => {
    return (acc += product.quantity);
  }, 0);

  const totalAmount = items.reduce((acc, product) => {
    const menuItems = Object.values(menu).flat();
    const itemPrice =
      menuItems.find((item) => item.id === product.id)?.price ?? 0;

    return (acc += itemPrice * product.quantity);
  }, 0);

  if (totalProducts === 0) return null;

  return (
    <footer className="p-6 flex max-w-sm:text-sm gap-8 bg-white border-1 border-t-gray-600 w-full fixed bottom-0 left-0 py-4 justify-between items-center">
      <OrderSummary totalAmount={totalAmount} totalProducts={totalProducts} />

      <Button onClick={() => navigate("/entrega")}>Finalizar pedido</Button>
    </footer>
  );
}
