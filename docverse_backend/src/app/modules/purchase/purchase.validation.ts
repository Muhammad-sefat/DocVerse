import { z } from "zod";

export const purchaseFilterValidationSchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
});
