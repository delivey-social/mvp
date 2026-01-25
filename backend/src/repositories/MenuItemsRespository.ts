import { MenuItem } from "../../public/MenuItems";
import { MenuItemsRepository as IMenuItemsRepository } from "./MenuItemsRepository.d";

import menuItems from "../../public/menu_items.json";

const allItems: MenuItem[] = [
  ...menuItems.bebidas,
  ...menuItems.salgados,
  ...menuItems.doces,
];

export class MenuItemsRepository implements IMenuItemsRepository {
  constructor() {}

  async findById(id: string): Promise<MenuItem | null> {
    return allItems.find((item) => item.id === id) ?? null;
  }

  async getAll(): Promise<MenuItem[]> {
    return allItems;
  }
}
