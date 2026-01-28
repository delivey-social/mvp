import NeighborhoodModel from "./model";

import { NeighborhoodRepository as INeighborhoodRepository } from "./repository.d";
import { Neighborhood } from "./types.d";

export class NeighborhoodRepository implements INeighborhoodRepository {
  constructor(private model: typeof NeighborhoodModel) {}

  async getAll(): Promise<Array<Neighborhood>> {
    return await this.model
      .find({})
      .collation({ locale: "en", strength: 1 })
      .sort({ name: 1 });
  }

  async findById(id: string): Promise<Neighborhood | null> {
    return await this.model.findById(id);
  }
}
