import idSchema from "../../shared/idSchema";
import { PaymentMethods } from "./PaymentMethods.d";
import { object, number, string, array, mixed, ObjectSchema } from "yup";
import { CreateOrderRequest, UpdateOrderRequest } from "./types";

const createOrderSchema: ObjectSchema<CreateOrderRequest> = object({
  items: array()
    .of(
      object({
        id: idSchema.required(),
        quantity: number().min(1).required(),
      }),
    )
    .min(1)
    .required(),
  user: object({
    email: string().email().required(),
    phoneNumber: string().required(),
    address: string().required(),
  }).required(),
  neighborhoodId: idSchema.required(),
  observation: string().optional(),
  paymentMethod: mixed<PaymentMethods>()
    .oneOf(Object.values(PaymentMethods))
    .required(),
}).strict();

const updateOrderSchema: ObjectSchema<UpdateOrderRequest> =
  createOrderSchema.partial();

export const withId = object({ id: idSchema.required() }).strict();

export default {
  create: createOrderSchema,
  update: updateOrderSchema,
  registerPayment: withId,
  readyForDelivery: withId,
  delivered: withId,
};
