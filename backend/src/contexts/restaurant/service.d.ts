import {
  CreateRestaurantRequest,
  UpdateRestaurantRequest,
  Restaurant,
} from "./types.d";

export interface RestaurantService {
  create(data: CreateRestaurantRequest): Promise<string>;
  update(id: string, data: UpdateRestaurantRequest): Promise<void>;
  getAll(): Promise<Restaurant[]>;
}
