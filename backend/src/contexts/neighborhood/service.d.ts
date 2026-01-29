import {
  CreateNeighborhoodRequest,
  Neighborhood,
  UpdateNeighborhoodRequest,
} from "./types.d";

export interface NeighborhoodService {
  getAll: () => Promise<Array<Neighborhood>>;
  findById: (id: string) => Promise<Neighborhood | null>;
  getDeliveryFee: (id: string) => Promise<number>;
  create: (data: CreateNeighborhoodRequest) => Promise<string>;
  update: (id: string, data: UpdateNeighborhoodRequest) => Promise<boolean>;
  delete: (id: string) => Promise<boolean>;
}
