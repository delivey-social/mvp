import { number, object, ObjectSchema, string } from "yup";
import {
  CreateNeighborhoodDTO,
  UpdateNeighborhoodDTO,
} from "shared/types/dtos/neighborhoods";

const create: ObjectSchema<CreateNeighborhoodDTO> = object({
  name: string().required(),
  deliveryFee: number().positive().required(),
});
const update: ObjectSchema<UpdateNeighborhoodDTO> = create.partial();

const neighborhoodSchemas = {
  create,
  update,
};
export default neighborhoodSchemas;
