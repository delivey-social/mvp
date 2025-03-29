import { useState } from "react";

interface MenuItemProps {
  name: string;
  imageUrl: string;
  price: number;
  description: string;
}

export default function MenuItem({
  name,
  imageUrl,
  price,
  description,
}: MenuItemProps) {
  const [count, setCount] = useState(0);

  return (
    <div className="flex justify-between items-center border-[1px] p-4 border-gray-300">
      <div className="flex flex-col gap-3 w-full max-w-60">
        <h4 className="font-semibold">{name}</h4>
        <div className="text-xs text-gray-500">{description}</div>

        <div className="flex mt-4">
          <div>{numberToCurrency(price)}</div>

          <div className="flex font-bold items-center gap-2 mx-4">
            <div
              onClick={() => setCount((count) => Math.max(count - 1, 0))}
              className="p-1"
            >
              -
            </div>
            <div>{count}</div>
            <div onClick={() => setCount((count) => count + 1)} className="p-1">
              +
            </div>
          </div>
        </div>
      </div>

      <img src={imageUrl} className="w-32 h-24 object-cover rounded-md" />
    </div>
  );
}

function numberToCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
