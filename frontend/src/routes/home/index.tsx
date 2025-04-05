import { useContext } from "react";
import menu from "../../menu_items.json";
import MenuItem from "./menu-item";
import numberToCurrency from "../../../../shared/utils/numberToCurrency";
import { useNavigate } from "react-router";
import { OrderContext } from "../../contexts/OrderContext";

export default function Home() {
  const { items, setItems } = useContext(OrderContext);

  function getProduct(id: string) {
    return items.find((product) => product.id === id);
  }

  function setProductQuantity(id: string) {
    return (quantity: number) => {
      if (quantity <= 0) {
        setItems((products) => products.filter((product) => product.id !== id));
        return;
      }

      if (items.find((product) => product.id === id)) {
        setItems((products) =>
          products.map((product) => {
            if (product.id !== id) return product;

            return { ...product, quantity: quantity };
          })
        );
      } else {
        setItems((products) => [...products, { id, quantity }]);
      }
    };
  }

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
    <div className="flex flex-col gap-4 h-full min-h-dvh w-full min-w-dvw">
      <main className="px-10 flex gap-6 flex-col pb-28">
        <h2 className="font-bold text-2xl mt-6">Santo Crepe</h2>

        {Object.entries(menu).map(([category, items]) => (
          <div key={category}>
            <h3 className="font-bold my-4">{capitalize(category)}</h3>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {items.map((item) => (
                <MenuItem
                  key={item.id}
                  {...item}
                  quantity={getProduct(item.id)?.quantity ?? 0}
                  setProductQuantity={setProductQuantity(item.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </main>

      {totalProducts > 0 && (
        <Footer itens={totalProducts} total={totalAmount} />
      )}
    </div>
  );
}

interface FooterProps {
  itens: number;
  total: number;
}

function Footer({ itens, total }: FooterProps) {
  const navigate = useNavigate();

  return (
    <footer className="px-4 flex max-w-sm:text-sm gap-8 bg-white border-1 border-t-gray-600 w-full fixed bottom-0 py-4 justify-between items-center">
      <div className="flex flex-col">
        <div className="font-bold text-xs text-gray-600">
          {itens} {itens === 1 ? "item" : "itens"}
        </div>

        <div className="font-bold">Total - {numberToCurrency(total)}</div>
      </div>

      <button
        onClick={() => navigate("/entrega")}
        className="bg-emerald-400 w-fit text-emerald-950 drop-shadow-md px-4 py-4 text-sm font-bold rounded-md active:drop-shadow none transition-all"
      >
        Finalizar pedido
      </button>
    </footer>
  );
}

function capitalize(string: string) {
  return String(string).charAt(0).toUpperCase() + String(string).slice(1);
}
