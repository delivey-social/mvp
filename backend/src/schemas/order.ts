import { z } from "zod";

const orderSchema = {
  create: z.object({
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
  }),
};

export default orderSchema;
