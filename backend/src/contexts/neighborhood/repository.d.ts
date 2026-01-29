import {
  CreateNeighborhoodRequest,
  Neighborhood,
  UpdateNeighborhoodRequest,
} from "./types.d";

export interface NeighborhoodRepository {
  getAll: () => Promise<Array<Neighborhood>>;
  findById: (id: string) => Promise<Neighborhood | null>;
  create: (data: CreateNeighborhoodRequest) => Promise<string>;
  update: (id: string, data: UpdateNeighborhoodRequest) => Promise<boolean>;
  delete: (id: string) => Promise<boolean>;
}
