import RestaurantModel from "../models/RestaurantModel";

import { CreateRestaurantRequest, Restaurant } from "../types/Restaurant";
import { RestaurantRepository as IRestaurantRepository } from "./RestaurantRepository.d";

export class RestaurantRepository implements IRestaurantRepository {
  constructor() {}

  async create(data: CreateRestaurantRequest): Promise<string> {
    const restaurant = await RestaurantModel.create(data);

    return restaurant.id;
  }

  async fetchALl(): Promise<Restaurant[]> {
    const restaurants = await RestaurantModel.find({});

    return restaurants;
  }
}
