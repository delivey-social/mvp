import { number, object, ObjectSchema, string } from "yup";
import {
  CreateMenuItemDTO,
  UpdateMenuItemDTO,
} from "shared/types/dtos/menu_items";
import idSchema from "@/shared/idSchema";

const create: ObjectSchema<CreateMenuItemDTO> = object({
  name: string().required(),
  description: string().optional(),
  price: number().positive().required(),
  imageUrl: string().required(),
  category: string().required(),
  restaurantId: idSchema.required(),
});

const update: ObjectSchema<UpdateMenuItemDTO> = create.partial();

const menuItemsSchemas = {
  create,
  update,
};
export default menuItemsSchemas;
