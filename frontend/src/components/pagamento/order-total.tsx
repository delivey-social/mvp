import { OrderContext } from "@/contexts/order/OrderContext";
import numberToCurrency from "@shared/utils/numberToCurrency";
import { useContext } from "react";

export default function OrderTotal() {
  const { total } = useContext(OrderContext);

  return (
    <div className="font-bold text-center bg-white p-2 px-4 rounded-xl drop-shadow-md w-full">
      Total - {numberToCurrency(total)}
    </div>
  );
}
