import { CRUDService } from "@/utils/CRUD";
import { Restaurant } from "./types.d";

export interface RestaurantService extends CRUDService<Restaurant> {}
