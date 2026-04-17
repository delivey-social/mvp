import idSchema, { withId } from "../../shared/idSchema";
import { object, number, string, array, mixed, ObjectSchema } from "yup";

import { CreateOrderDTO, UpdateOrderDTO } from "shared/types/dtos/order";
import { PaymentMethods } from "shared/types/PaymentMethods.d";

const createOrderSchema: ObjectSchema<CreateOrderDTO> = object({
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

const updateOrderSchema: ObjectSchema<UpdateOrderDTO> =
  createOrderSchema.partial();

export default {
  create: createOrderSchema,
  update: updateOrderSchema,
  registerPayment: withId,
  readyForDelivery: withId,
  delivered: withId,
};
