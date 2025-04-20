import menu from "../../public/menu_items.json";

import { Order } from "../models/OrderModel";

const MenuItemsService = {
  getItemsTotal: async (items: Order["items"]): Promise<number> => {
    return items.reduce((acc, item) => {
      const menuItems = Object.values(menu).flat();
      const menuItem = menuItems.find((menuItem) => menuItem.id === item.id);

      if (!menuItem) throw new Error(`Menu item with id ${item.id} not found`);

      return acc + menuItem.price * item.quantity;
    }, 0);
  },
  getItemsDetails: async (items: Order["items"]) => {
    const menuItems = Object.values(menu).flat();

    return items.map((item) => {
      const menuItem = menuItems.find((menuItem) => menuItem.id === item.id);

      if (!menuItem) throw new Error(`Menu item with id ${item.id} not found`);

      return {
        ...menuItem,
        quantity: item.quantity,
      };
    });
  },
};

export default MenuItemsService;
