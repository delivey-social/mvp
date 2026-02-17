import { RestaurantService as IRestaurantService } from "./service.d";

import { RestaurantRepository } from "./repository.d";
import {
  CreateRestaurantRequest,
  UpdateRestaurantRequest,
  Restaurant,
} from "./types.d";
import { ResourceNotFoundError } from "@/errors/HTTPError";

export class RestaurantService implements IRestaurantService {
  constructor(private repo: RestaurantRepository) {}

  async create(data: CreateRestaurantRequest): Promise<Restaurant> {
    return this.repo.create(data);
  }

  async update(id: string, data: UpdateRestaurantRequest): Promise<Restaurant> {
    return await this.repo.update(id, data);
  }

  async delete(id: string): Promise<void> {
    const success = await this.repo.delete(id);

    if (!success) throw new ResourceNotFoundError("restaurant");
  }

  async list(): Promise<Restaurant[]> {
    return await this.repo.list();
  }

  async findById(id: string): Promise<Restaurant> {
    return await this.repo.findById(id);
  }
}
