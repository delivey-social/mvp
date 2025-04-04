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
    const itemPrice =
      [...menu.salgados, ...menu.doces].find((item) => item.id === product.id)
        ?.price ?? 0;

    return (acc += itemPrice * product.quantity);
  }, 0);

  return (
    <div className="flex flex-col gap-4 h-full min-h-dvh w-full min-w-dvw">
      <main className="px-10 flex gap-6 flex-col pb-20">
        <h2 className="font-bold text-2xl mt-4">Santo Crepe</h2>

        {Object.entries(menu).map(([category, items]) => (
          <div key={category}>
            <h3 className="font-bold my-4">{capitalize(category)}</h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
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

        <h3 className="font-bold">Salgados</h3>

        {menu.salgados.map((item) => (
          <MenuItem
            key={item.id}
            {...item}
            quantity={getProduct(item.id)?.quantity ?? 0}
            setProductQuantity={setProductQuantity(item.id)}
          />
        ))}

        <h3 className="font-bold">Doces</h3>

        {menu.doces.map((item) => (
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

function capitalize(string: string) {
  return String(string).charAt(0).toUpperCase() + String(string).slice(1);
}
