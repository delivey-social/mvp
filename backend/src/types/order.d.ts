import orderSchema from "../schemas/order";

export type CreateOrder = z.infer<typeof orderSchema.create>;
