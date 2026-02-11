import { CRUDRepository } from "@/utils/CRUD";
import {
  CreateMenuItemRequest,
  UpdateMenuItemRequest,
  MenuItem,
} from "./types.d";

export interface MenuItemsRepository
  extends CRUDRepository<
    MenuItem,
    CreateMenuItemRequest,
    UpdateMenuItemRequest
  > {}
