import { CRUDRepository } from "@/utils/CRUD";
import { NeighborhoodDTO } from "shared/types/dtos/neighborhoods";

export interface NeighborhoodRepository
  extends CRUDRepository<NeighborhoodDTO> {}
