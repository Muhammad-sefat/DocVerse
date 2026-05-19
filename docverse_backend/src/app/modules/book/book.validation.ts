import { z } from "zod";

export const createBookValidationSchema = z.object({
  title: z.string(),

  description: z.string(),

  coverImage: z.string(),

  pdfUrl: z.string(),

  price: z.number(),

  borrowPrice: z.number(),

  borrowDuration: z.number(),

  totalPages: z.number(),

  categoryId: z.string(),
});

export const updateBookValidationSchema = createBookValidationSchema.partial();
