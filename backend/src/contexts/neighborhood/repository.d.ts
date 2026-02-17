import { CRUDRepository } from "@/utils/CRUD";
import { Neighborhood } from "@shared/types/neighborhoods";

export interface NeighborhoodRepository extends CRUDRepository<Neighborhood> {}
