import { MenuItemsService as IMenuItemsService } from "./service";

import { CreateMenuItemRequest, MenuItem } from "./types.d";
import { MenuItemsRepository } from "./repository.d";

export class MenuItemsService implements IMenuItemsService {
  constructor(private repo: MenuItemsRepository) {}

  async findById(id: string): Promise<MenuItem | null> {
    return this.repo.findById(id);
  }

  async getAll(): Promise<MenuItem[]> {
    const items = await this.repo.getAll();

    return items;
  }

  async create(data: CreateMenuItemRequest): Promise<string> {
    return this.repo.create(data);
  }
}
