import MenuItemModel from "./model";

import { MenuItemsRepository as IMenuItemsRepository } from "./repository.d";
import { CreateMenuItemRequest, MenuItem } from "./types.d";

export class MenuItemsRepository implements IMenuItemsRepository {
  constructor(private model: typeof MenuItemModel) {}

  async findById(id: string): Promise<MenuItem | null> {
    return this.model.findById(id).lean().exec();
  }

  async getAll(): Promise<MenuItem[]> {
    const items = await this.model.find({}).lean().exec();

    return items.map((i) => ({
      ...i,
      id: i._id.toString(),
      _id: undefined,
      __v: undefined,
    }));
  }

  async create(data: CreateMenuItemRequest) {
    const menuItem = await this.model.create(data);

    return menuItem.id;
  }
}
