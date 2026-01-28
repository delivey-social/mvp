import { CreateMenuItemRequest, MenuItem } from "./types.d";

export interface MenuItemsRepository {
  create: (data: CreateMenuItemRequest) => Promise<string>;
  findById: (id: string) => Promise<MenuItem | null>;
  getAll: () => Promise<MenuItem[]>;
}
