import { Restaurant } from "./types.d";
import {
  CreateRestaurantRequest,
  UpdateRestaurantRequest,
} from "@shared/types/restaurant";
import { RestaurantRepository as IRestaurantRepository } from "./repository.d";

import cleanMongooseObject from "@/utils/cleanMongooseObject";
import RestaurantModel from "./model";
import { ResourceNotFoundError } from "@/errors/HTTPError";

export class RestaurantRepository implements IRestaurantRepository {
  constructor(private model: typeof RestaurantModel) {}

  async create(data: CreateRestaurantRequest): Promise<Restaurant> {
    const restaurant = await RestaurantModel.create(data);

    return cleanMongooseObject(restaurant);
  }

  async update(id: string, data: UpdateRestaurantRequest): Promise<Restaurant> {
    const item = await RestaurantModel.findByIdAndUpdate(id, data);

    if (!item) {
      throw new ResourceNotFoundError("restaurant");
    }

    return item;
  }

  async delete(id: string): Promise<boolean> {
    const resource = await this.model.findByIdAndDelete(id);

    return Boolean(resource);
  }

  async list(): Promise<Restaurant[]> {
    const restaurants = await RestaurantModel.find({});

    return restaurants.map((r) => cleanMongooseObject<Restaurant>(r));
  }

  async findById(id: string): Promise<Restaurant> {
    const item = await this.model.findById(id);

    if (!item) {
      throw new ResourceNotFoundError("restaurant");
    }

    return cleanMongooseObject(item);
  }
}
