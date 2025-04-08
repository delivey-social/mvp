import { FormEvent, useContext, useEffect, useState } from "react";
import numberToCurrency from "../../../../shared/utils/numberToCurrency";
import { OrderContext } from "../../contexts/OrderContext";
import menu from "../../menu_items.json";
import { useNavigate } from "react-router";
import axios from "axios";

interface GetNeighborhoodsResponseItem {
  _id: string;
  name: string;
  baseTariff: number;
}

export default function Entrega() {
  const navigate = useNavigate();
  const { items, setUser, sendOrder } = useContext(OrderContext);

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

  const [neighborhoods, setNeighborhoods] = useState<
    GetNeighborhoodsResponseItem[]
  >([]);
  const [selectedNeighborhood, setSelectedNeighborhood] =
    useState<GetNeighborhoodsResponseItem | null>(null);
  const appFee = itemsTotal * 0.1;
  const total = itemsTotal + appFee + (selectedNeighborhood?.baseTariff ?? 0);

  useEffect(() => {
    axios
      .get<
        GetNeighborhoodsResponseItem[]
      >(`${import.meta.env.VITE_BACKEND_URL}/neighborhoods`)
      .then((data) => {
        setNeighborhoods(data.data);
      });
  }, []);

  return (
    <div className="flex flex-col gap-4 h-full w-full min-w-dvw">
      <main className="px-10 flex gap-6 flex-col pb-12 max-w-md w-full mx-auto mt-12">
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
          <select
            className="text-sm border-1 py-2 px-2 rounded-md border-gray-300 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
            required
            onChange={(ev) =>
              setSelectedNeighborhood(
                neighborhoods.find(
                  (neighborhood) => neighborhood._id === ev.target.value
                )!
              )
            }
          >
            <option disabled selected>
              Bairro
            </option>
            {neighborhoods.map((neighborhood) => (
              <option key={neighborhood._id} value={neighborhood._id}>
                {neighborhood.name}
              </option>
            ))}
          </select>

          <div className="ml-auto flex flex-col gap-2 mt-4">
            <ResultLine label="Total dos itens" value={itemsTotal} />
            <ResultLine label="Taxa Delivery Social" value={appFee} />
            <ResultLine
              label="Taxa de entrega"
              value={selectedNeighborhood?.baseTariff}
            />
            <ResultLine label="Total" value={total} />
          </div>

          <button
            disabled={!selectedNeighborhood || !items.length}
            className="disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-default cursor-pointer bg-emerald-400 w-full mt-4 text-emerald-950  px-4 py-4 text-sm font-bold rounded-md"
          >
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

function ResultLine({ label, value }: { label: string; value?: number }) {
  return (
    <div className="flex gap-4 ml-auto text-sm">
      <div className="font-bold">{label}</div>
      <div>{value ? numberToCurrency(value) : "--"}</div>
    </div>
  );
}
