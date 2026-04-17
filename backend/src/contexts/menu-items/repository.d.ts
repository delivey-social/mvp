import { CRUDRepository } from "@/utils/CRUD";
import {
  CreateMenuItemDTO,
  UpdateMenuItemDTO,
} from "shared/types/dtos/menu_items";
import { MenuItem } from "./types.d";

export interface MenuItemsRepository
  extends CRUDRepository<MenuItem, CreateMenuItemDTO, UpdateMenuItemDTO> {}
