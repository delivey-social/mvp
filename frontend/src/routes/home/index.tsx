import { menu_doces, menu_salgados } from "../../../public/menu_items";
import MenuItem from "./menu-item";

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

        <h3 className="font-bold">Doces</h3>

        {menu_doces.map((item) => (
          <MenuItem key={item.name} {...item} />
        ))}
      </main>
    </div>
  );
}

function Navbar() {
  return (
    <div className="text-white drop-shadow-lg top-0 w-full py-6 rounded-b-2xl bg-red-800 border-b-1 flex items-center justify-center font-bold text-xl">
      Delivery
    </div>
  );
}
