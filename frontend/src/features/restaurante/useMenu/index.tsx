import { IMenuItem } from "@/MenuItems";
import axios from "axios";
import { useEffect, useState } from "react";

interface MenuItemDTO {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  restaurantId: string;
}

export default function useMenu(): Record<string, IMenuItem[]> {
  const [data, setData] = useState<Record<string, IMenuItem[]>>({});

  useEffect(() => {
    axios
      .get<MenuItemDTO[]>(`${import.meta.env.VITE_BACKEND_URL}/menu-items`)
      .then((data) => {
        const transformedData: Record<string, IMenuItem[]> = {};
        data.data.forEach((item) => {
          if (!transformedData[item.category]) {
            transformedData[item.category] = [];
          }
          transformedData[item.category].push({
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            imageUrl: item.imageUrl,
          });
        });
        setData(transformedData);
      });
  }, []);

  return data;
}
