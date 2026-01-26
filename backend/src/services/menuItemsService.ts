import MenuItemRepository from "../repositories/MenuItemRepository";
import { Order } from "../models/OrderModel";

const MenuItemsService = {
  getItemsTotal: async (items: Order["items"]): Promise<number> => {
    const menuItems = await MenuItemRepository.getAll();

    return items.reduce((acc, item) => {
      const menuItem = menuItems.find((menuItem) => menuItem.id === item.id);

      if (!menuItem) throw new Error(`Menu item with id ${item.id} not found`);

      return acc + menuItem.price * item.quantity;
    }, 0);
  },
  getItemsDetails: async (items: Order["items"]) => {
    const menuItems = await MenuItemRepository.getAll();

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
