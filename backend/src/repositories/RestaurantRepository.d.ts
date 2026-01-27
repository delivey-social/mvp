import { CreateRestaurantRequest, Restaurant } from "../types/Restaurant";

export interface RestaurantRepository {
  create(data: CreateRestaurantRequest): Promise<string>;
  fetchAll(): Promise<Restaurant[]>;
}
