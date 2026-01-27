import MenuItemModel from "../models/MenuItemModel";

import { MenuItemsRepository as IMenuItemsRepository } from "./MenuItemsRepository.d";

import { CreateMenuItemRequest, MenuItem } from "../types/MenuItems.d";

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
