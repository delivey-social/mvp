import { menu_salgados } from "../../../public/menu_items";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 h-full min-h-dvh w-full min-w-dvw">
      <Navbar />

      <main className="px-10 flex gap-6 flex-col pb-20">
        <h2 className="font-bold text-2xl mt-4">Santo Crepe</h2>

        <h3 className="font-bold">Salgados</h3>

        {menu_salgados.map((item) => (
          <MenuItem key={item.name} {...item} />
        ))}
      </main>
    </div>
  );
}

function Navbar() {
  return (
    <div className="text-white top-0 w-full py-6 rounded-b-2xl bg-red-800 border-b-1 flex items-center justify-center font-bold text-xl">
      Delivery
    </div>
  );
}

interface MenuItemProps {
  name: string;
  imageUrl: string;
  price: number;
  description: string;
}

function MenuItem({ name, imageUrl, price, description }: MenuItemProps) {
  return (
    <div className="flex justify-between border-[1px] p-4 border-gray-300">
      <div className="flex flex-col gap-3 w-full max-w-60">
        <h4 className="font-semibold">{name}</h4>
        <div className="text-xs text-gray-500">{description}</div>

        <div>R$ {price}</div>
      </div>
      <img src={imageUrl} className="w-32" />
    </div>
  );
}
