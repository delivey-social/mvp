import { object, ObjectSchema, string } from "yup";
import {
  CreateRestaurantDTO,
  UpdateRestaurantDTO,
} from "shared/types/dtos/restaurant";

const create: ObjectSchema<CreateRestaurantDTO> = object({
  name: string().required(),
  address: string().required(),
});

const update: ObjectSchema<UpdateRestaurantDTO> = create.partial();

const restaurantSchemas = { create, update };
export default restaurantSchemas;
