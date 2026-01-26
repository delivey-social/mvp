import { IMenuItem } from "../../public/MenuItems";
import { MenuItemsRepository as IMenuItemsRepository } from "./MenuItemsRepository.d";

import menuItems from "../../public/menu_items.json";

const allItems: IMenuItem[] = [
  ...menuItems.bebidas,
  ...menuItems.salgados,
  ...menuItems.doces,
];

export class MenuItemsRepository implements IMenuItemsRepository {
  constructor() {}

  async findById(id: string): Promise<IMenuItem | null> {
    return allItems.find((item) => item.id === id) ?? null;
  }

  async getAll(): Promise<IMenuItem[]> {
    return allItems;
  }
}
