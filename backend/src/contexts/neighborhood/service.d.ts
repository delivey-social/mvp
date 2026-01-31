import {
  CreateNeighborhoodRequest,
  UpdateNeighborhoodRequest,
  Neighborhood,
} from "./types.d";

export interface NeighborhoodService {
  getAll: () => Promise<Array<Neighborhood>>;
  findById: (id: string) => Promise<Neighborhood | null>;
  getDeliveryFee: (id: string) => Promise<number>;
  create: (data: CreateNeighborhoodRequest) => Promise<Neighborhood>;
  update: (
    id: string,
    data: UpdateNeighborhoodRequest,
  ) => Promise<Neighborhood>;
  delete: (id: string) => Promise<boolean>;
}
