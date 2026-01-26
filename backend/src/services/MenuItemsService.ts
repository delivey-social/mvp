import { IMenuItem } from "../../public/MenuItems";
import { MenuItemsRepository } from "../repositories/MenuItemsRepository";
import { MenuItemsService as IMenuItemsService } from "./MenuItemsService";

export class MenuItemsService implements IMenuItemsService {
  constructor(private repo: MenuItemsRepository) {}

  async findById(id: string): Promise<IMenuItem> {
    return this.repo.findById(id);
  }

  async getAll(): Promise<IMenuItem[]> {
    return this.repo.getAll();
  }
}
