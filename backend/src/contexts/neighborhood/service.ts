import { ResourceNotFoundError } from "../../errors/HTTPError";

import {
  CreateNeighborhoodRequest,
  Neighborhood,
  UpdateNeighborhoodRequest,
} from "./types.d";
import { NeighborhoodRepository } from "./repository.d";
import { NeighborhoodService as INeighborhoodService } from "./service.d";

import cleanMongooseObject from "@/utils/cleanMongooseObject";

export class NeighborhoodService implements INeighborhoodService {
  constructor(private repo: NeighborhoodRepository) {}

  async list(): Promise<Array<Neighborhood>> {
    return await this.repo.list();
  }

  async findById(id: string): Promise<Neighborhood> {
    return await this.repo.findById(id);
  }

  async getDeliveryFee(id: string) {
    const neighborhood = await this.repo.findById(id);

    if (!neighborhood) {
      throw new ResourceNotFoundError("Neighborhood");
    }

    return neighborhood.deliveryFee;
  }

  async create(data: CreateNeighborhoodRequest): Promise<Neighborhood> {
    return await this.repo.create(data);
  }

  async update(
    id: string,
    data: UpdateNeighborhoodRequest,
  ): Promise<Neighborhood> {
    return await this.repo.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
