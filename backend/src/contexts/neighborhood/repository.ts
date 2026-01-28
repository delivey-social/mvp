import NeighborhoodModel from "./model";

import { NeighborhoodRepository as INeighborhoodRepository } from "./repository.d";
import { Neighborhood } from "./types.d";

export class NeighborhoodRepository implements INeighborhoodRepository {
  constructor(private model: typeof NeighborhoodModel) {}

  async getAll(): Promise<Array<Neighborhood>> {
    const items = await this.model
      .find({})
      .collation({ locale: "en", strength: 1 })
      .sort({ name: 1 });

    return items.map((i) => ({
      ...i.toObject(),
      id: i._id,
      __v: undefined,
      _id: undefined,
    }));
  }

  async findById(id: string): Promise<Neighborhood | null> {
    return await this.model.findById(id);
  }
}
