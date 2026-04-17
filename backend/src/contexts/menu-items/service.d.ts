import { CRUDService } from "@/utils/CRUD";
import { MenuItem } from "./types.d";
import {
  CreateMenuItemDTO,
  UpdateMenuItemDTO,
} from "shared/types/dtos/menu_items";

export interface MenuItemsService
  extends CRUDService<MenuItem, CreateMenuItemDTO, UpdateMenuItemDTO> {}
