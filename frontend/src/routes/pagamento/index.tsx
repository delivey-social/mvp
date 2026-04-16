import PixQRCode from "@/components/pagamento/pix-qr-code";
import PixCode from "@/components/pagamento/pix-code";
import OrderTotal from "@/components/pagamento/order-total";

export default function PagamentoRoute() {
  return (
    <main
      className="relative mx-auto px-10 w-full flex flex-col gap-6 m
	ax-w-md my-8"
    >
      <PixQRCode />

      <PixCode />

      <OrderTotal />
    </main>
  );
}
