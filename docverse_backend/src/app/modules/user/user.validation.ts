import { z } from "zod";

export const updateProfileValidationSchema = z.object({
  name: z.string().optional(),
  profileImage: z.string().optional(),
});
