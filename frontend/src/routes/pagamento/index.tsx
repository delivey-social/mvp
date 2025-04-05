import { useContext, useEffect, useState } from "react";

import { OrderContext } from "../../contexts/OrderContext";

import menu from "../../menu_items.json";
import numberToCurrency from "../../../../shared/utils/numberToCurrency";

export default function Pagamento() {
  const [showNotification, setShowNotification] = useState(true);

  const { items } = useContext(OrderContext);

  const totalAmount = items.reduce((acc, product) => {
    const menuItems = Object.values(menu).flat();
    const itemPrice =
      menuItems.find((item) => item.id === product.id)?.price ?? 0;

    return (acc += itemPrice * product.quantity);
  }, 0);

  const CHAVE_PIX =
    "00020126360014BR.GOV.BCB.PIX0114209486940001095204000053039865802BR5901N6001C62070503***63048600";

  useEffect(() => {
    if (showNotification) {
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    }
  }, [showNotification]);

  return (
    <div className="flex flex-col gap-4 h-full min-h-dvh w-dvw mx-auto max-w-md">
      <main className="relative mx-auto px-10 w-full flex flex-col gap-6">
        <div
          className={`absolute w-86 h-10 border-2 border-gray-400 left-1/2 flex items-center justify-between text-center z-10 top-0 rounded-md -translate-x-1/2 bg-gray-50 ${showNotification ? "opacity-100" : "opacity-0"} transition-all`}
        >
          <p className="mx-auto font-semibold">
            Pix copiado para a área de transferência
          </p>
        </div>

        <div className="p-2 rounded-xl w-60 mx-auto drop-shadow-md mt-5 bg-white">
          <img src="/qr-code.png" />
        </div>

        <div className="bg-white mx-auto font-bold flex items-center justify-between p-2 px-4 rounded-xl drop-shadow-md w-full">
          <p className="w-full overflow-hidden whitespace-nowrap text-ellipsis text-center">
            {CHAVE_PIX}
          </p>

          <img
            src="/copy.svg"
            onClick={() => {
              navigator.clipboard.writeText(CHAVE_PIX);
              setShowNotification(true);
            }}
            className="w-5 hover:opacity-50 cursor-pointer transition-opacity"
          />
        </div>

        <div className="font-bold text-center bg-white p-2 px-4 rounded-xl drop-shadow-md w-full">
          Total - {numberToCurrency(totalAmount)}
        </div>
      </main>
    </div>
  );
}
