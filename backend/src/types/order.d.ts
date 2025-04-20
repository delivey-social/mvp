import { z } from "zod";
import orderSchema from "../schemas/order";

export type CreateOrderRequest = z.infer<typeof orderSchema.create>;
