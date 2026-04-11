import menu from "../../../menu_items.json";

import { useNavigate } from "react-router";

import numberToCurrency from "@shared/utils/numberToCurrency";

import { useContext } from "react";
import { OrderContext } from "../../../contexts/OrderContext";

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

  return (
    <footer className="px-4 flex max-w-sm:text-sm gap-8 bg-white border-1 border-t-gray-600 w-full fixed bottom-0 left-0 py-4 justify-between items-center">
      <div className="flex flex-col">
        <div className="font-bold text-xs text-gray-600">
          {totalProducts} {totalProducts === 1 ? "item" : "itens"}
        </div>

        <div className="font-bold">Total - {numberToCurrency(totalAmount)}</div>
      </div>

      <button
        onClick={() => navigate("/entrega")}
        className="bg-emerald-400 w-fit text-emerald-950 drop-shadow-md px-4 py-4 text-sm font-bold rounded-md active:drop-shadow none transition-all cursor-pointer"
      >
        Finalizar pedido
      </button>
    </footer>
  );
}
