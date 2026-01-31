import {
  CreateRestaurantRequest,
  UpdateRestaurantRequest,
  Restaurant,
} from "./types.d";

export interface RestaurantRepository {
  create(data: CreateRestaurantRequest): Promise<string>;
  update(id: string, data: UpdateRestaurantRequest): Promise<void>;
  fetchAll(): Promise<Restaurant[]>;
}
