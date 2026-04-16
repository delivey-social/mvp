import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router";

import { OrderContext } from "@/contexts/order/OrderContext";

import type { NeighborhoodDTO } from "@shared/types/dtos/neighborhoods";

import ROUTES from "@/routes/routes";
import { PaymentMethods } from "@/types/Order";
import PaymentMethodSelect from "./payment-method-select";
import Button from "@/components/ui/button";

import InputsArea from "./inputs";
import PricesArea from "./prices";
import useMenu from "@/features/restaurante/useMenu";

export default function OrderDetailsForm() {
  const menu = useMenu();
  const navigate = useNavigate();
  const { items, sendOrder, setTotal } = useContext(OrderContext);

  const itemsTotal = items.reduce((acc, product) => {
    const menuItems = Object.values(menu).flat();
    const itemPrice =
      menuItems.find((item) => item.id === product.id)?.price ?? 0;

    return (acc += itemPrice * product.quantity);
  }, 0);

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();

    const data = new FormData(ev.currentTarget as HTMLFormElement);

    const email = data.get("email") as string;
    const phoneNumber = data.get("phoneNumber") as string;
    const address = data.get("address") as string;
    const observation = data.get("observations") as string;
    const payment_method = data.get("payment_method") as PaymentMethods;

    if (!selectedNeighborhood) {
      throw new Error("Selecione um bairro");
    }

    await sendOrder(
      {
        email,
        address,
        phoneNumber: phoneNumber,
        neighborhoodId: selectedNeighborhood.id,
      },
      payment_method,
      observation,
    );
    setTotal(total);

    if (payment_method === PaymentMethods.Pix) {
      navigate(ROUTES.pagamento);
      return;
    }

    navigate(ROUTES.sucesso);
  }

  const [selectedNeighborhood, setSelectedNeighborhood] =
    useState<NeighborhoodDTO | null>(null);
  const appFee = itemsTotal * 0.1;
  const total = itemsTotal + appFee + (selectedNeighborhood?.deliveryFee ?? 0);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <InputsArea setSelectedNeighborhood={setSelectedNeighborhood} />

      <PricesArea
        itemsTotal={itemsTotal}
        appFee={appFee}
        deliveryFee={selectedNeighborhood?.deliveryFee}
      />

      <PaymentMethodSelect />

      <Button
        type="submit"
        disabled={!selectedNeighborhood || !items.length}
        className="mt-8"
      >
        Finalizar a compra
      </Button>
    </form>
  );
}
