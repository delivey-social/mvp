import { MenuItem } from "../../public/MenuItems";
import { CreateMenuItemRequest } from "../types/MenuItems";

export interface MenuItemsService {
  create: (data: CreateMenuItemRequest) => Promise<string>;
  findById: (id: string) => Promise<MenuItem>;
  getAll: () => Promise<MenuItem[]>;
}
