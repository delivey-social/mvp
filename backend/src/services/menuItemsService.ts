import menu from "../../public/menu_items.json";

const MenuItemsService = {
  getItemsTotal: async (
    items: { id: string; quantity: number }[]
  ): Promise<number> => {
    return items.reduce((acc, item) => {
      const menuItems = Object.values(menu).flat();
      const menuItem = menuItems.find((menuItem) => menuItem.id === item.id);

      if (!menuItem) throw new Error(`Menu item with id ${item.id} not found`);

      return acc + menuItem.price * item.quantity;
    }, 0);
  },
};

export default MenuItemsService;
