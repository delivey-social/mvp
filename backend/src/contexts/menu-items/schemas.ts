import { number, object, ObjectSchema, string } from "yup";
import { CreateMenuItemRequest, UpdateMenuItemRequest } from "./types";
import idSchema from "@/shared/idSchema";

const create: ObjectSchema<CreateMenuItemRequest> = object({
  name: string().required(),
  description: string().optional(),
  price: number().positive().required(),
  imageUrl: string().required(),
  category: string().required(),
  restaurantId: idSchema.required(),
});

const update: ObjectSchema<UpdateMenuItemRequest> = create.partial();

const menuItemsSchemas = {
  create,
  update,
};
export default menuItemsSchemas;
