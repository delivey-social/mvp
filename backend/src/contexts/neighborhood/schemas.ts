import { number, object, ObjectSchema, string } from "yup";
import {
  CreateNeighborhoodRequest,
  UpdateNeighborhoodRequest,
} from "@shared/types/neighborhoods";

const create: ObjectSchema<CreateNeighborhoodRequest> = object({
  name: string().required(),
  deliveryFee: number().positive().required(),
});
const update: ObjectSchema<UpdateNeighborhoodRequest> = create.partial();

const neighborhoodSchemas = {
  create,
  update,
};
export default neighborhoodSchemas;
