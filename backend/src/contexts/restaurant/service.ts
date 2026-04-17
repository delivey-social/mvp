import { RestaurantService as IRestaurantService } from "./service.d";

import { RestaurantRepository } from "./repository.d";
import { Restaurant } from "./types.d";
import { ResourceNotFoundError } from "@/errors/HTTPError";
import {
  CreateRestaurantDTO,
  UpdateRestaurantDTO,
} from "shared/types/dtos/restaurant";

export class RestaurantService implements IRestaurantService {
  constructor(private repo: RestaurantRepository) {}

  async create(data: CreateRestaurantDTO): Promise<Restaurant> {
    return this.repo.create(data);
  }

  async update(id: string, data: UpdateRestaurantDTO): Promise<Restaurant> {
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
