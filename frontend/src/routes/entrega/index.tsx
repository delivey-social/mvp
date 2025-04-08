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
  const { items, setUserProperty, sendOrder, setTotal, user } =
    useContext(OrderContext);

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

    if (!selectedNeighborhood) {
      throw new Error("Selecione um bairro");
    }

    try {
      await sendOrder(
        {
          email,
          address,
          phone_number,
          neighborhood_id: selectedNeighborhood._id,
        },
        observation
      );
      setTotal(total);

      navigate("/pagamento");
    } catch (err) {
      console.error(err);
    }
  }

  const [selectedNeighborhood, setSelectedNeighborhood] =
    useState<GetNeighborhoodsResponseItem | null>(null);
  const appFee = itemsTotal * 0.1;
  const total = itemsTotal + appFee + (selectedNeighborhood?.baseTariff ?? 0);

  return (
    <div className="flex flex-col gap-4 h-full w-full min-w-dvw">
      <main className="px-10 flex gap-6 flex-col pb-12 max-w-md w-full mx-auto mt-12">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="email"
            name="email"
            required
            value={user.email}
            onChange={(ev) =>
              setUserProperty("email", (ev.target as HTMLInputElement).value)
            }
          />
          <Input
            type="text"
            placeholder="Telefone"
            name="phone_number"
            required
            value={user.phone_number}
            onChange={(ev) =>
              setUserProperty(
                "phone_number",
                (ev.target as HTMLInputElement).value
              )
            }
          />
          <Input
            type="text"
            placeholder="Endereço"
            name="address"
            required
            value={user.address}
            onChange={(ev) =>
              setUserProperty("address", (ev.target as HTMLInputElement).value)
            }
          />
          <SelectNeighborhood
            selectedNeighborhoodId={user.neighborhood_id}
            setSelectedNeighborhood={setSelectedNeighborhood}
          />
          <Input type="text" placeholder="Observações" name="observations" />

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

function SelectNeighborhood({
  selectedNeighborhoodId,
  setSelectedNeighborhood,
}: {
  selectedNeighborhoodId: string;
  setSelectedNeighborhood: (neighborhood: GetNeighborhoodsResponseItem) => void;
}) {
  const { setUserProperty } = useContext(OrderContext);
  const [neighborhoods, setNeighborhoods] = useState<
    GetNeighborhoodsResponseItem[]
  >([]);
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
    <select
      className="text-sm border-1 py-2 px-2 rounded-md border-gray-300 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
      required
      defaultValue={selectedNeighborhoodId ?? ""}
      onChange={(ev) => {
        setSelectedNeighborhood(
          neighborhoods.find(
            (neighborhood) => neighborhood._id === ev.target.value
          )!
        );
        setUserProperty("neighborhood_id", ev.target.value);
      }}
    >
      <option disabled value="">
        Bairro
      </option>
      {neighborhoods.map((neighborhood) => (
        <option key={neighborhood._id} value={neighborhood._id}>
          {neighborhood.name}
        </option>
      ))}
    </select>
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
