import { MenuItem } from "../../public/MenuItems";

export interface MenuItemsService {
  findById: (id: string) => Promise<MenuItem>;
  getAll: () => Promise<MenuItem[]>;
}
