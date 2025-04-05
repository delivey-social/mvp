import { FormEvent, useContext } from "react";
import numberToCurrency from "../../../../shared/utils/numberToCurrency";
import { OrderContext } from "../../contexts/OrderContext";
import menu from "../../menu_items.json";
import { useNavigate } from "react-router";

export default function Entrega() {
  const navigate = useNavigate();
  const { items, setUser, sendOrder } = useContext(OrderContext);

  const itemsTotal = items.reduce((acc, product) => {
    const menuItems = Object.values(menu).flat();
    const itemPrice =
      menuItems.find((item) => item.id === product.id)?.price ?? 0;

    return (acc += itemPrice * product.quantity);
  }, 0);
  const appFee = itemsTotal * 0.1;
  const deliveryFee = 5;
  const total = itemsTotal + appFee + deliveryFee;

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();

    const data = new FormData(ev.currentTarget as HTMLFormElement);

    const email = data.get("email") as string;
    const phone_number = data.get("phone_number") as string;
    const address = data.get("address") as string;
    const observation = data.get("observations") as string;

    setUser({
      email,
      address,
      phone_number,
    });

    try {
      await sendOrder({ email, address, phone_number }, observation);

      navigate("/pagamento");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col gap-4 h-full w-full min-w-dvw">
      <main className="px-10 flex gap-6 flex-col pb-12 max-w-md mx-auto mt-12">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input type="email" placeholder="email" name="email" required />
          <Input
            type="text"
            placeholder="Telefone"
            name="phone_number"
            required
          />
          <Input type="text" placeholder="Endereço" name="address" required />
          <Input type="text" placeholder="Observações" name="observations" />

          <span className="text-gray-600 my-4 text-sm">
            Atenção, entregas somente na regional matriz de Curitiba. Demais
            localidades estão sujeitas à análise.
          </span>

          <div className="ml-auto flex flex-col gap-2 mt-4">
            <ResultLine label="Total dos itens" value={itemsTotal} />
            <ResultLine label="Taxa Delivery Social" value={appFee} />
            <ResultLine label="Taxa de entrega" value={deliveryFee} />
            <ResultLine label="Total" value={total} />
          </div>

          <button className="bg-emerald-400 w-full mt-4 text-emerald-950  px-4 py-4 text-sm font-bold rounded-md">
            Finalizar a compra
          </button>
        </form>
      </main>
    </div>
  );
}

function Input(props: React.HTMLProps<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`${props.className} text-sm border-1 py-2 px-2 rounded-md border-gray-300 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500`}
    />
  );
}

function ResultLine({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex gap-4 ml-auto text-sm">
      <div className="font-bold">{label}</div>
      <div>{numberToCurrency(value)}</div>
    </div>
  );
}
