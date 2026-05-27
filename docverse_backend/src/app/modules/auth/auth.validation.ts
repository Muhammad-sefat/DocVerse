import { z } from "zod";

export const registerUserValidationSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["USER", "AUTHOR"]).optional(),
});

export const loginUserValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
