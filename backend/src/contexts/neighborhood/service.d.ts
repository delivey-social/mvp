import { CRUDService } from "@/utils/CRUD";
import { Neighborhood } from "./types.d";

export interface NeighborhoodService extends CRUDService<Neighborhood> {
  getDeliveryFee: (id: string) => Promise<number>;
}
