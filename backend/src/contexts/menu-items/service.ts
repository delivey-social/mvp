import { MenuItemsService as IMenuItemsService } from "./service";

import { CreateMenuItemRequest, MenuItem } from "./types.d";
import { MenuItemsRepository } from "./repository.d";

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
