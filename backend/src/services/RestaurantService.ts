import { RestaurantService as IRestaurantService } from "./RestaurantService.d";
import { RestaurantRepository } from "../repositories/RestaurantRepository";

import { CreateRestaurantRequest, Restaurant } from "../types/Restaurant";

export class RestaurantService implements IRestaurantService {
  constructor(private repo: RestaurantRepository) {}

  async create(data: CreateRestaurantRequest): Promise<string> {
    return this.repo.create(data);
  }

  async getAll(): Promise<Restaurant[]> {
    return await this.repo.fetchALl();
  }
}
