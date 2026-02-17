import {
  CreateMenuItemRequest,
  MenuItem,
  UpdateMenuItemRequest,
} from "./types.d";
import { MenuItemsService as IMenuItemsService } from "./service.d";
import { MenuItemsRepository } from "./repository.d";
import { ResourceNotFoundError } from "@/errors/HTTPError";

export class MenuItemsService implements IMenuItemsService {
  constructor(private repo: MenuItemsRepository) {}

  async findById(id: string): Promise<MenuItem> {
    return await this.repo.findById(id);
  }

  async list(): Promise<MenuItem[]> {
    return await this.repo.list();
  }

  async create(data: CreateMenuItemRequest): Promise<MenuItem> {
    return this.repo.create(data);
  }

  async update(id: string, data: UpdateMenuItemRequest) {
    return this.repo.update(id, data);
  }

  async delete(id: string): Promise<void> {
    const exists = await this.repo.delete(id);

    if (!exists) throw new ResourceNotFoundError("item");
  }
}
