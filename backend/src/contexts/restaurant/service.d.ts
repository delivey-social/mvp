import { CRUDService } from "@/utils/CRUD";
import {
  CreateRestaurantRequest,
  UpdateRestaurantRequest,
  Restaurant,
} from "./types.d";

export interface RestaurantService extends CRUDService<Restaurant> {}
