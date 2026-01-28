import { z } from "zod";
import { PaymentMethods } from "./PaymentMethods";
import idSchema from "../../shared/idSchema";

// TODO: Derive schema from models
const orderSchema = {
  create: z
    .object({
      items: z
        .array(
          z.object({
            id: z.string(),
            quantity: z.number().positive().int(),
          }),
        )
        .min(1),
      user: z.object({
        email: z.string().email(),
        phoneNumber: z.string(),
        address: z.string(),
      }),
      neighborhoodId: z.string(),
      observation: z.string().optional(),
      paymentMethod: z.nativeEnum(PaymentMethods),
    })
    .strict(),
  registerPayment: z.object({ id: idSchema }).strict(),
  readyForDelivery: z.object({ id: idSchema }).strict(),
  delivered: z.object({ id: idSchema }).strict(),
};

export default orderSchema;
