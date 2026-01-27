import { MenuItemsRepository } from "../repositories/MenuItemsRepository.d";
import { MenuItemsService as IMenuItemsService } from "./MenuItemsService.d";

import { CreateMenuItemRequest, MenuItem } from "../types/MenuItems.d";

export class MenuItemsService implements IMenuItemsService {
  constructor(private repo: MenuItemsRepository) {}

  async findById(id: string): Promise<MenuItem> {
    return this.repo.findById(id);
  }

  async getAll(): Promise<MenuItem[]> {
    const items = await this.repo.getAll();

    return items.map((i) => ({
      ...i,
      id: i["_id"].toString(),
      __v: undefined,
      _id: undefined,
    }));
  }

  async create(data: CreateMenuItemRequest): Promise<string> {
    return this.repo.create(data);
  }
}
