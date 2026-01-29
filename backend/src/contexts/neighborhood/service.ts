import { ResourceNotFoundError } from "../../errors/HTTPError";

import { CreateNeighborhoodRequest, Neighborhood } from "./types.d";
import { NeighborhoodRepository } from "./repository.d";
import { NeighborhoodService as INeighborhoodService } from "./service.d";

export class NeighborhoodService implements INeighborhoodService {
  constructor(private repo: NeighborhoodRepository) {}

  async getAll(): Promise<Array<Neighborhood>> {
    return await this.repo.getAll();
  }

  async findById(id: string): Promise<Neighborhood | null> {
    return await this.repo.findById(id);
  }

  async getDeliveryFee(id: string) {
    const neighborhood = await this.repo.findById(id);

    if (!neighborhood) {
      throw new ResourceNotFoundError("Neighborhood");
    }

    return neighborhood.deliveryFee;
  }

  async create(data: CreateNeighborhoodRequest): Promise<string> {
    return await this.repo.create(data);
  }
}
