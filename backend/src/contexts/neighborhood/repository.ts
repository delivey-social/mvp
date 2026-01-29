import NeighborhoodModel from "./model";

import { NeighborhoodRepository as INeighborhoodRepository } from "./repository.d";
import { CreateNeighborhoodRequest, Neighborhood } from "./types.d";

import cleanMongooseObject from "@/utils/cleanMongooseObject";

export class NeighborhoodRepository implements INeighborhoodRepository {
  constructor(private model: typeof NeighborhoodModel) {}

  async getAll(): Promise<Array<Neighborhood>> {
    const items = await this.model
      .find({})
      .collation({ locale: "en", strength: 1 })
      .sort({ name: 1 })
      .lean()
      .exec();

    return items.map((i) => cleanMongooseObject<Neighborhood>(i));
  }

  async findById(id: string): Promise<Neighborhood | null> {
    const item = await this.model.findById(id).lean().exec();

    return item ? cleanMongooseObject<Neighborhood>(item) : null;
  }

  async create(data: CreateNeighborhoodRequest): Promise<string> {
    const res = await this.model.create(data);

    return res.id;
  }
}
