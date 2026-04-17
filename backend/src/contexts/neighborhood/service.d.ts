import { CRUDService } from "@/utils/CRUD";
import { NeighborhoodDTO } from "shared/types/dtos/neighborhoods";

export interface NeighborhoodService extends CRUDService<NeighborhoodDTO> {
  getDeliveryFee: (id: string) => Promise<number>;
}
