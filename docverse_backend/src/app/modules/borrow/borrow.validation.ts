import { z } from "zod";

export const borrowFilterValidationSchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
});
