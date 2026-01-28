import MenuItemModel from "./model";

import { MenuItemsRepository as IMenuItemsRepository } from "./repository.d";
import { CreateMenuItemRequest, MenuItem } from "./types.d";

export class MenuItemsRepository implements IMenuItemsRepository {
  constructor(private model: typeof MenuItemModel) {}

  async findById(id: string): Promise<MenuItem | null> {
    return this.model.findById(id).lean().exec();
  }

  async getAll(): Promise<MenuItem[]> {
    return this.model.find({}).lean().exec();
  }

  async create(data: CreateMenuItemRequest) {
    const menuItem = await this.model.create(data);

    return menuItem.id;
  }
}
