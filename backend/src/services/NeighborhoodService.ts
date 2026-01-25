import { NeighborhoodRepository } from "../repositories/NeighborhoodRepository.d";
import { Neighborhood } from "../types/Neighborhood";
import { NeighborhoodService as INeighborhoodService } from "./NeighborhoodService.d";

export class NeighborhoodService implements INeighborhoodService {
  constructor(private repo: NeighborhoodRepository) {}

  async getAll(): Promise<Array<Neighborhood>> {
    return await this.repo.getAll();
  }

  async findById(id: string): Promise<Neighborhood | null> {
    return await this.repo.findById(id);
  }
}
