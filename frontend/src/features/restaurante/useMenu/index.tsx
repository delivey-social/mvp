import { IMenuItem } from "@/MenuItems";

export default function useMenu(): Record<string, IMenuItem[]> {
  return {
    Salgados: [
      {
        id: "1",
        name: "Coxinha",
        description: "Deliciosa coxinha de frango com catupiry",
        price: 5.0,
        imageUrl: "https://example.com/coxinha.jpg",
      },
    ],
  };
}
