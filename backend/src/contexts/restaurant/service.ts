import { RestaurantService as IRestaurantService } from "./service";

import { RestaurantRepository } from "./repository.d";
import {
  CreateRestaurantRequest,
  UpdateRestaurantRequest,
  Restaurant,
} from "./types.d";

export class RestaurantService implements IRestaurantService {
  constructor(private repo: RestaurantRepository) {}

  async create(data: CreateRestaurantRequest): Promise<string> {
    return this.repo.create(data);
  }

  async getAll(): Promise<Restaurant[]> {
    return await this.repo.fetchAll();
  }

  async update(id: string, data: UpdateRestaurantRequest): Promise<void> {
    return await this.repo.update(id, data);
  }
}
