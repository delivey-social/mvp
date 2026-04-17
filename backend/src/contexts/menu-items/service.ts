import { MenuItem } from "./types.d";
import { MenuItemsService as IMenuItemsService } from "./service.d";
import { MenuItemsRepository } from "./repository.d";
import { ResourceNotFoundError } from "@/errors/HTTPError";
import {
  CreateMenuItemDTO,
  UpdateMenuItemDTO,
} from "shared/types/dtos/menu_items";

export class MenuItemsService implements IMenuItemsService {
  constructor(private repo: MenuItemsRepository) {}

  async findById(id: string): Promise<MenuItem> {
    return await this.repo.findById(id);
  }

  async list(): Promise<MenuItem[]> {
    return await this.repo.list();
  }

  async create(data: CreateMenuItemDTO): Promise<MenuItem> {
    return this.repo.create(data);
  }

  async update(id: string, data: UpdateMenuItemDTO) {
    return this.repo.update(id, data);
  }

  async delete(id: string): Promise<void> {
    const exists = await this.repo.delete(id);

    if (!exists) throw new ResourceNotFoundError("item");
  }
}
