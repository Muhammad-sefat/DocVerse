import { z } from "zod";

export const addToWishlistValidationSchema = z.object({
  bookId: z.string(),
});
