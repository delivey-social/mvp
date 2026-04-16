import ROUTES from "@/routes/routes";

import { useNavigate } from "react-router";

import OrderSummary from "./order-summary";
import Button from "@/components/ui/button";

interface FooterProps {
  totalProducts: number;
  totalAmount: number;
}

export default function Footer({ totalProducts, totalAmount }: FooterProps) {
  const navigate = useNavigate();

  if (totalProducts === 0) return null;

  return (
    <footer className="p-6 flex max-w-sm:text-sm gap-8 bg-white border-1 border-t-gray-600 w-full fixed bottom-0 left-0 py-4 justify-between items-center">
      <OrderSummary totalAmount={totalAmount} totalProducts={totalProducts} />

      <Button onClick={() => navigate(ROUTES.detalhesEntrega)}>
        Finalizar pedido
      </Button>
    </footer>
  );
}
