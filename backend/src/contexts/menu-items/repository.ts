import { ResourceNotFoundError } from "@/errors/HTTPError";
import MenuItemModel from "./model";

import { MenuItemsRepository as IMenuItemsRepository } from "./repository.d";
import { MenuItem } from "./types.d";

import cleanMongooseObject from "@/utils/cleanMongooseObject";
import {
  CreateMenuItemDTO,
  UpdateMenuItemDTO,
} from "shared/types/dtos/menu_items";

export class MenuItemsRepository implements IMenuItemsRepository {
  constructor(private model: typeof MenuItemModel) {}

  async list(): Promise<MenuItem[]> {
    const items = await this.model.find({});

    return items.map((i) => cleanMongooseObject<MenuItem>(i));
  }

  async findById(id: string): Promise<MenuItem> {
    const item = await this.model.findById(id);

    if (!item) {
      throw new ResourceNotFoundError("menu item");
    }

    return cleanMongooseObject(item);
  }

  async create(data: CreateMenuItemDTO) {
    return cleanMongooseObject(await this.model.create(data));
  }

  async update(id: string, data: UpdateMenuItemDTO): Promise<MenuItem> {
    const item = await this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      throw new ResourceNotFoundError("menu item");
    }

    return cleanMongooseObject(item);
  }

  async delete(id: string): Promise<boolean> {
    const resource = await this.model.findByIdAndDelete(id);

    return Boolean(resource);
  }
}
