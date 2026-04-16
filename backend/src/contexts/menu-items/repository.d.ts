import { CRUDRepository } from "@/utils/CRUD";
import {
  CreateMenuItemRequest,
  UpdateMenuItemRequest,
} from "@shared/types/menu_items";
import { MenuItem } from "./types.d";

export interface MenuItemsRepository
  extends CRUDRepository<
    MenuItem,
    CreateMenuItemRequest,
    UpdateMenuItemRequest
  > {}
