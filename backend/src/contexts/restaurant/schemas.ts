import { object, ObjectSchema, string } from "yup";
import { CreateRestaurantRequest, UpdateRestaurantRequest } from "./types";

const create: ObjectSchema<CreateRestaurantRequest> = object({
  name: string().required(),
  address: string().required(),
});

const update: ObjectSchema<UpdateRestaurantRequest> = create.partial();

const restauranteSchemas = { create, update };
export default restauranteSchemas;
