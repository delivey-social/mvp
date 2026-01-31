import { ResourceNotFoundError } from "@/errors/HTTPError";
import NeighborhoodModel from "./model";

import { NeighborhoodRepository as INeighborhoodRepository } from "./repository.d";
import {
  CreateNeighborhoodRequest,
  Neighborhood,
  UpdateNeighborhoodRequest,
} from "./types.d";

import cleanMongooseObject from "@/utils/cleanMongooseObject";

export class NeighborhoodRepository implements INeighborhoodRepository {
  constructor(private model: typeof NeighborhoodModel) {}

  async getAll(): Promise<Array<Neighborhood>> {
    const items = await this.model
      .find({})
      .collation({ locale: "en", strength: 1 })
      .sort({ name: 1 });

    return items.map((i) => cleanMongooseObject<Neighborhood>(i));
  }

  async findById(id: string): Promise<Neighborhood | null> {
    const item = await this.model.findById(id);

    return item ? cleanMongooseObject<Neighborhood>(item) : null;
  }

  async create(data: CreateNeighborhoodRequest): Promise<Neighborhood> {
    const res = await this.model.create(data);

    return res;
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
    return Boolean(await this.model.findByIdAndDelete(id));
  }

  async list(): Promise<Neighborhood[]> {
    const items = await this.model.find({});

    return items.map((i) => cleanMongooseObject(i));
  }
}
