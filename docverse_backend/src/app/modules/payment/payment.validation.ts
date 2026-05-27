import { z } from "zod";

export const createCheckoutValidationSchema = z.object({
  bookId: z.string(),
  paymentType: z.enum(["PURCHASE", "BORROW"]),
  borrowDays: z.number().optional(),
});
