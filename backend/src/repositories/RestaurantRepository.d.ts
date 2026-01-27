import { CreateRestaurantRequest } from "../types/Restaurant";

export interface RestaurantRepository {
  create(data: CreateRestaurantRequest): Promise<string>;
  fetchALl(): Promise<Restaurant[]>;
}
