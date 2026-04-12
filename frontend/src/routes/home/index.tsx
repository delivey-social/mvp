import menu from "@/menu_items.json";

import { useContext } from "react";
import { OrderContext } from "@/contexts/order/OrderContext";

import Header from "../../components/home/header";
import Footer from "../../components/home/footer";

import CategoriesArea from "../../components/home/categories-area";

export default function Home() {
  const { items } = useContext(OrderContext);

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
    <main className="flex flex-col gap-4 px-10 py-4 max-w-7xl mx-auto overflow">
      <Header />

      <CategoriesArea />

      <Footer totalProducts={totalProducts} totalAmount={totalAmount} />
    </main>
  );
}
