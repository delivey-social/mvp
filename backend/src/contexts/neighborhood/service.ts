import {
  CreateNeighborhoodDTO,
  NeighborhoodDTO,
  UpdateNeighborhoodDTO,
} from "shared/types/dtos/neighborhoods";
import { ResourceNotFoundError } from "../../errors/HTTPError";

import { NeighborhoodRepository } from "./repository.d";
import { NeighborhoodService as INeighborhoodService } from "./service.d";

import cleanMongooseObject from "@/utils/cleanMongooseObject";

export class NeighborhoodService implements INeighborhoodService {
  constructor(private repo: NeighborhoodRepository) {}

  async list(): Promise<Array<NeighborhoodDTO>> {
    return await this.repo.list();
  }

  async findById(id: string): Promise<NeighborhoodDTO> {
    return await this.repo.findById(id);
  }

  async getDeliveryFee(id: string) {
    const neighborhood = await this.repo.findById(id);

    if (!neighborhood) {
      throw new ResourceNotFoundError("Neighborhood");
    }

    return neighborhood.deliveryFee;
  }

  async create(data: CreateNeighborhoodDTO): Promise<NeighborhoodDTO> {
    return await this.repo.create(data);
  }

  async update(
    id: string,
    data: UpdateNeighborhoodDTO,
  ): Promise<NeighborhoodDTO> {
    return await this.repo.update(id, data);
  }

  async delete(id: string): Promise<void> {
    const exists = await this.repo.delete(id);

    if (!exists) throw new ResourceNotFoundError("neighborhood");
  }
}
