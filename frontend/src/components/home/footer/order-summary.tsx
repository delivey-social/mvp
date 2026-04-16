import numberToCurrency from "@shared/utils/numberToCurrency";

interface OrderSummaryProps {
  totalProducts: number;
  totalAmount: number;
}

export default function OrderSummary({
  totalProducts,
  totalAmount,
}: OrderSummaryProps) {
  const TOTAL_ITEMS_LABEL =
    totalProducts === 1 ? "1 item" : `${totalProducts} itens`;

  const ORDER_TOTAL_LABEL = `Total - ${numberToCurrency(totalAmount)}`;

  return (
    <div className="flex flex-col">
      <div className="font-bold text-xs text-gray-600">{TOTAL_ITEMS_LABEL}</div>

      <div className="font-bold">{ORDER_TOTAL_LABEL}</div>
    </div>
  );
}
