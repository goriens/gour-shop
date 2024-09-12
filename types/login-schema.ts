import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter valid email",
  }),
  password: z.string().min(1, {
    message: "Please enter your password",
  }),
  code: z.optional(z.string()),
});
