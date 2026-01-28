import RestaurantModel from "./model";

import { CreateRestaurantRequest, Restaurant } from "./types.d";
import { RestaurantRepository as IRestaurantRepository } from "./repository";

export class RestaurantRepository implements IRestaurantRepository {
  constructor() {}

  async create(data: CreateRestaurantRequest): Promise<string> {
    const restaurant = await RestaurantModel.create(data);

    return restaurant.id;
  }

  async fetchAll(): Promise<Restaurant[]> {
    const restaurants = await RestaurantModel.find({}).lean().exec();

    return restaurants.map((r) => ({
      ...r,
      id: r["_id"].toString(),
      __v: undefined,
      _id: undefined,
    }));
  }
}
