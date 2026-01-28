import { CreateRestaurantRequest, Restaurant } from "./types.d";

export interface RestaurantService {
  create(data: CreateRestaurantRequest): Promise<string>;
  getAll(): Promise<Restaurant[]>;
}
