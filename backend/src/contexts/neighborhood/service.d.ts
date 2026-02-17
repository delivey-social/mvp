import { CRUDService } from "@/utils/CRUD";
import { Neighborhood } from "@shared/types/neighborhoods";

export interface NeighborhoodService extends CRUDService<Neighborhood> {
  getDeliveryFee: (id: string) => Promise<number>;
}
