import { CRUDRepository } from "@/utils/CRUD";
import { Restaurant } from "./types.d";

export interface RestaurantRepository extends CRUDRepository<Restaurant> {}
