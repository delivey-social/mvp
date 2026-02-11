import { CRUDService } from "@/utils/CRUD";
import {
  CreateMenuItemRequest,
  UpdateMenuItemRequest,
  MenuItem,
} from "./types.d";

export interface MenuItemsService
  extends CRUDService<MenuItem, CreateMenuItemRequest, UpdateMenuItemRequest> {}
