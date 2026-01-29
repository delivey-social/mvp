import MenuItemModel from "./model";

import { MenuItemsRepository as IMenuItemsRepository } from "./repository.d";
import { CreateMenuItemRequest, MenuItem } from "./types.d";

import cleanMongooseObject from "@/utils/cleanMongooseObject";

export class MenuItemsRepository implements IMenuItemsRepository {
  constructor(private model: typeof MenuItemModel) {}

  async findById(id: string): Promise<MenuItem | null> {
    return this.model.findById(id).lean().exec();
  }

  async getAll(): Promise<MenuItem[]> {
    const items = await this.model.find({}).lean().exec();

    return items.map((i) => cleanMongooseObject<MenuItem>(i));
  }

  async create(data: CreateMenuItemRequest) {
    const menuItem = await this.model.create(data);

    return menuItem.id;
  }
}
