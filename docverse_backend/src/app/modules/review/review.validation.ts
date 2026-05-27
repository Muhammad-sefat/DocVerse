import { z } from "zod";

export const createReviewValidationSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(1),
  bookId: z.string(),
});

export const updateReviewValidationSchema = z.object({
  rating: z.number().min(1).max(5).optional(),
  comment: z.string().min(1).optional(),
});
