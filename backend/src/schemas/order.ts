import { z } from "zod";
import idSchema from "./id";

const orderSchema = {
  create: z
    .object({
      items: z
        .array(
          z.object({
            id: z.string(),
            quantity: z.number().positive().int(),
          })
        )
        .min(1),
      user: z.object({
        email: z.string().email(),
        phone_number: z.string(),
        address: z.string(),
      }),
      neighborhood_id: z.string(),
      observation: z.string().optional(),
      payment_method: z.enum(["PIX", "CREDIT_CARD", "DEBIT_CARD"]),
    })
    .strict(),
  registerPayment: z.object({ id: idSchema }).strict(),
  readyForDelivery: z.object({ id: idSchema }).strict(),
  delivered: z.object({ id: idSchema }).strict(),
};

export default orderSchema;
