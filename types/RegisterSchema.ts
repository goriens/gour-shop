import * as z from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is too short" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});
