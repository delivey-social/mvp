import { useContext } from "react";

import { OrderContext } from "../../contexts/OrderContext";

import menu from "../../menu_items.json";
import numberToCurrency from "../../../../shared/utils/numberToCurrency";

export default function Pagamento() {
  const { items } = useContext(OrderContext);

  const totalAmount = items.reduce((acc, product) => {
    const itemPrice =
      [...menu.salgados, ...menu.doces].find((item) => item.id === product.id)
        ?.price ?? 0;

    return (acc += itemPrice * product.quantity);
  }, 0);

  const CHAVE_PIX =
    "00020126330014BR.GOV.BCB.PIX0111010555789785204000053039865802BR5901N6001C62070503***630497CF";

  return (
    <div className="flex flex-col gap-4 h-full min-h-dvh w-dvw max-w-dvw">
      <main className="mx-auto px-10 w-full flex flex-col gap-6">
        <div className="p-2 rounded-xl w-60 mx-auto drop-shadow-md mt-5 bg-white">
          <img src="/qr-code.svg" />
        </div>

        <div className="bg-white mx-auto font-bold flex items-center justify-between p-2 px-4 rounded-xl drop-shadow-md w-full">
          <p className="w-full overflow-hidden whitespace-nowrap text-ellipsis">
            {CHAVE_PIX}
          </p>

          <img
            src="/copy.svg"
            className="w-5"
            onClick={() => navigator.clipboard.writeText(CHAVE_PIX)}
          />
        </div>

        <div className="font-bold text-center bg-white p-2 px-4 rounded-xl drop-shadow-md w-full">
          Total - {numberToCurrency(totalAmount)}
        </div>
      </main>
    </div>
  );
}
