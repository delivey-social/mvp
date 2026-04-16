import { ResourceNotFoundError } from "@/errors/HTTPError";
import NeighborhoodModel from "./model";

import { NeighborhoodRepository as INeighborhoodRepository } from "./repository.d";

import cleanMongooseObject from "@/utils/cleanMongooseObject";
import {
  CreateNeighborhoodRequest,
  Neighborhood,
  UpdateNeighborhoodRequest,
} from "@shared/types/neighborhoods";

export class NeighborhoodRepository implements INeighborhoodRepository {
  constructor(private model: typeof NeighborhoodModel) {}

  async getAll(): Promise<Array<Neighborhood>> {
    const items = await this.model
      .find({})
      .collation({ locale: "en", strength: 1 })
      .sort({ name: 1 });

    return items.map((i) => cleanMongooseObject<Neighborhood>(i));
  }

  async findById(id: string): Promise<Neighborhood> {
    const item = await this.model.findById(id);

    if (!item) {
      throw new ResourceNotFoundError("neighborhood");
    }

    return cleanMongooseObject(item);
  }

  async create(data: CreateNeighborhoodRequest): Promise<Neighborhood> {
    return cleanMongooseObject(await this.model.create(data));
  }

  async update(
    id: string,
    data: UpdateNeighborhoodRequest,
  ): Promise<Neighborhood> {
    const neighborhood = await this.model.findByIdAndUpdate(id, data);

    if (!neighborhood) {
      throw new ResourceNotFoundError("neighborhood");
    }

    return cleanMongooseObject(neighborhood);
  }

  async delete(id: string): Promise<boolean> {
    const resource = await this.model.findByIdAndDelete(id);

    return Boolean(resource);
  }

  async list(): Promise<Neighborhood[]> {
    const items = await this.model.find({});

    return items.map((i) => cleanMongooseObject(i));
  }
}
