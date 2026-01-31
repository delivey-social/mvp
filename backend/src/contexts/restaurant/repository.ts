import RestaurantModel from "./model";

import {
  CreateRestaurantRequest,
  UpdateRestaurantRequest,
  Restaurant,
} from "./types.d";
import { RestaurantRepository as IRestaurantRepository } from "./repository";

import cleanMongooseObject from "@/utils/cleanMongooseObject";

export class RestaurantRepository implements IRestaurantRepository {
  constructor() {}

  async create(data: CreateRestaurantRequest): Promise<string> {
    const restaurant = await RestaurantModel.create(data);

    return restaurant.id;
  }

  async update(id: string, data: UpdateRestaurantRequest): Promise<void> {
    await RestaurantModel.findByIdAndUpdate(id, data);
  }

  async fetchAll(): Promise<Restaurant[]> {
    const restaurants = await RestaurantModel.find({});

    return restaurants.map((r) => cleanMongooseObject<Restaurant>(r));
  }
}
