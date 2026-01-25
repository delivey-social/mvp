import { MenuItem } from "../../public/MenuItems";
import { MenuItemsRepository } from "../repositories/MenuItemsRepository";
import { MenuItemsService as IMenuItemsService } from "./MenuItemsService";

export class MenuItemsService implements IMenuItemsService {
  constructor(private repo: MenuItemsRepository) {}

  async findById(id: string): Promise<MenuItem> {
    return this.repo.findById(id);
  }

  async getAll(): Promise<MenuItem[]> {
    return this.repo.getAll();
  }
}
