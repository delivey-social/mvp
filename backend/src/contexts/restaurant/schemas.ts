import { object, ObjectSchema, string } from "yup";
import {
  CreateRestaurantRequest,
  UpdateRestaurantRequest,
} from "@shared/types/restaurant";

const create: ObjectSchema<CreateRestaurantRequest> = object({
  name: string().required(),
  address: string().required(),
});

const update: ObjectSchema<UpdateRestaurantRequest> = create.partial();

const restaurantSchemas = { create, update };
export default restaurantSchemas;
