import { CRUDService } from "@/utils/CRUD";
import { MenuItem } from "./types.d";
import {
  CreateMenuItemRequest,
  UpdateMenuItemRequest,
} from "@shared/types/menu_items";

export interface MenuItemsService
  extends CRUDService<MenuItem, CreateMenuItemRequest, UpdateMenuItemRequest> {}
