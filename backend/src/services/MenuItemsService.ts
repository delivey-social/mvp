import { IMenuItem } from "../../public/MenuItems";

import { MenuItemsRepository } from "../repositories/MenuItemsRepository.d";
import { MenuItemsService as IMenuItemsService } from "./MenuItemsService.d";

import { CreateMenuItemRequest } from "../types/MenuItems";

export class MenuItemsService implements IMenuItemsService {
  constructor(private repo: MenuItemsRepository) {}

  async findById(id: string): Promise<IMenuItem> {
    return this.repo.findById(id);
  }

  async getAll(): Promise<IMenuItem[]> {
    return this.repo.getAll();
  }

  async create(data: CreateMenuItemRequest): Promise<string> {
    return this.repo.create(data);
  }
}
