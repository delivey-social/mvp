import idSchema, { withId } from "../../shared/idSchema";
import { object, number, string, array, mixed, ObjectSchema } from "yup";

import { CreateOrderRequest, UpdateOrderRequest } from "@shared/types/order";
import { PaymentMethods } from "@shared/types/PaymentMethods.d";

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

export default {
  create: createOrderSchema,
  update: updateOrderSchema,
  registerPayment: withId,
  readyForDelivery: withId,
  delivered: withId,
};
