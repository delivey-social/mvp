import { CreateMenuItemRequest, MenuItem } from "./types.d";

export interface MenuItemsService {
  create: (data: CreateMenuItemRequest) => Promise<string>;
  findById: (id: string) => Promise<MenuItem | null>;
  getAll: () => Promise<MenuItem[]>;
}
