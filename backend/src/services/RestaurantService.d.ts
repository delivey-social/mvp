import { Restaurant } from "../types/Restaurant";

export interface RestaurantService {
  create(data: CreateRestaurantRequest): Promise<string>;
  getAll(): Promise<Restaurant[]>;
}
