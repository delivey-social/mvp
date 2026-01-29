import { CreateNeighborhoodRequest, Neighborhood } from "./types";

export interface NeighborhoodService {
  getAll: () => Promise<Array<Neighborhood>>;
  findById: (id: string) => Promise<Neighborhood | null>;
  getDeliveryFee: (id: string) => Promise<number>;
  create: (data: CreateNeighborhoodRequest) => Promise<string>;
}
