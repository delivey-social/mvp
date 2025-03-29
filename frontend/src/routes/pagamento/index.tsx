import { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import Navbar from "../../shared-components/navbar";
import { menu_doces, menu_salgados } from "../../../public/menu_items";
import { numberToCurrency } from "../home/menu-item";

export default function Pagamento() {
  const { items } = useContext(OrderContext);

  const totalAmount = items.reduce((acc, product) => {
    const itemPrice =
      [...menu_salgados, ...menu_doces].find((item) => item.id === product.id)
        ?.price ?? 0;

    return (acc += itemPrice * product.quantity);
  }, 0);

  const CNPJ = "20.948.694/0001-09";

  return (
    <div className="flex flex-col gap-4 h-full min-h-dvh w-full min-w-dvw">
      <Navbar />

      <main className="flex flex-col gap-6 items-center justify-center">
        <div className="flex flex-col gap-6">
          <div className="p-4 rounded-xl drop-shadow-md mt-5 bg-white">
            <img src="/qr-code.svg" className="w-60 m-auto" />
          </div>

          <div className="bg-white font-bold flex items-center justify-between p-2 px-4 rounded-xl drop-shadow-md w-full">
            <p>CNPJ {CNPJ}</p>

            <img
              src="/copy.svg"
              className="w-5"
              onClick={() => navigator.clipboard.writeText(CNPJ)}
            />
          </div>

          <div className="font-bold text-center bg-white p-2 px-4 rounded-xl drop-shadow-md w-full">
            Total - {numberToCurrency(totalAmount)}
          </div>
        </div>
      </main>
    </div>
  );
}
