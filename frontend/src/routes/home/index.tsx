import { useContext } from "react";
import { menu_doces, menu_salgados } from "../../../public/menu_items";
import MenuItem, { numberToCurrency } from "./menu-item";
import { useNavigate } from "react-router";
import { OrderContext } from "../../contexts/OrderContext";

export default function Home() {
  const { items, setItems } = useContext(OrderContext);

  function getProduct(id: number) {
    return items.find((product) => product.id === id);
  }

  function setProductQuantity(id: number) {
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
    const itemPrice =
      [...menu_salgados, ...menu_doces].find((item) => item.id === product.id)
        ?.price ?? 0;

    return (acc += itemPrice * product.quantity);
  }, 0);

  return (
    <div className="flex flex-col gap-4 h-full min-h-dvh w-full min-w-dvw">
      <Navbar />

      <main className="px-10 flex gap-6 flex-col pb-20">
        <h2 className="font-bold text-2xl mt-4">Santo Crepe</h2>

        <h3 className="font-bold">Salgados</h3>

        {menu_salgados.map((item) => (
          <MenuItem
            key={item.id}
            {...item}
            quantity={getProduct(item.id)?.quantity ?? 0}
            setProductQuantity={setProductQuantity(item.id)}
          />
        ))}

        <h3 className="font-bold">Doces</h3>

        {menu_doces.map((item) => (
          <MenuItem
            key={item.name}
            {...item}
            quantity={getProduct(item.id)?.quantity ?? 0}
            setProductQuantity={setProductQuantity(item.id)}
          />
        ))}
      </main>

      {totalProducts > 0 && (
        <Footer itens={totalProducts} total={totalAmount} />
      )}
    </div>
  );
}

function Navbar() {
  return (
    <div className="text-white drop-shadow-lg top-0 w-full py-6 rounded-b-2xl bg-red-800 border-b-1 flex items-center justify-center font-bold text-xl">
      Delivery
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
    <footer className="px-4 flex items-center gap-8 bg-white border-1 border-t-red-700 w-full fixed bottom-0 py-4 justify-end">
      <div className="flex justify-between items-center gap-4">
        <div className="font-bold ">{itens} itens</div>
      </div>

      <div className="font-bold ">Total - {numberToCurrency(total)}</div>

      <button
        onClick={() => navigate("/entrega")}
        className="bg-red-700 w-fit text-white  px-4 py-4 text-sm font-bold rounded-md"
      >
        Finalizar pedido
      </button>
    </footer>
  );
}
