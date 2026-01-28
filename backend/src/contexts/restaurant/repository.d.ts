import { CreateRestaurantRequest, Restaurant } from "./types.d";

export interface RestaurantRepository {
  create(data: CreateRestaurantRequest): Promise<string>;
  fetchAll(): Promise<Restaurant[]>;
}
