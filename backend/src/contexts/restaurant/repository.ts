import RestaurantModel from "./model";

import { CreateRestaurantRequest, Restaurant } from "./types.d";
import { RestaurantRepository as IRestaurantRepository } from "./repository";

import cleanMongooseObject from "@/utils/cleanMongooseObject";

export class RestaurantRepository implements IRestaurantRepository {
  constructor() {}

  async create(data: CreateRestaurantRequest): Promise<string> {
    const restaurant = await RestaurantModel.create(data);

    return restaurant.id;
  }

  async fetchAll(): Promise<Restaurant[]> {
    const restaurants = await RestaurantModel.find({}).lean().exec();

    return restaurants.map((r) => cleanMongooseObject<Restaurant>(r));
  }
}
