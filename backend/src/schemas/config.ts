import { z } from "zod";

const configSchema = {
  open: z.object({ isOpen: z.boolean() }).strict(),
};

export default configSchema;
