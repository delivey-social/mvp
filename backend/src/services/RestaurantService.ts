import { RestaurantService as IRestaurantService } from "./RestaurantService.d";
import { RestaurantRepository } from "../repositories/RestaurantRepository";

import { CreateRestaurantRequest } from "../types/Restaurant";

export class RestaurantService implements IRestaurantService {
  constructor(private repo: RestaurantRepository) {}

  async create(data: CreateRestaurantRequest): Promise<string> {
    return this.repo.create(data);
  }
}
