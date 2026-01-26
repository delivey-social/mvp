import { Neighborhood } from "../types/Neighborhood";

export interface NeighborhoodRepository {
  getAll: () => Promise<Array<Neighborhood>>;
  findById: (id: string) => Promise<Neighborhood | null>;
}
