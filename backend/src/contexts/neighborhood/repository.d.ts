import { CreateNeighborhoodRequest, Neighborhood } from "./types.d";

export interface NeighborhoodRepository {
  getAll: () => Promise<Array<Neighborhood>>;
  findById: (id: string) => Promise<Neighborhood | null>;
  create: (data: CreateNeighborhoodRequest) => Promise<string>;
}
