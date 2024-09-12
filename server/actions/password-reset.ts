"use server";

import { ResetSchema } from "@/types/reset-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { generatePasswordResetToken } from "./tokens";
import { sendResetPasswordEmail } from "./email";

const clientAction = createSafeActionClient();
export const resetPassword = clientAction
  .schema(ResetSchema)
  .action(async ({ parsedInput: { email } }) => {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (!existingUser) {
      return { error: "User Not Found" };
    }
    const passwordResetToken = await generatePasswordResetToken(email);
    if (!passwordResetToken) {
      return { error: "Token not generated" };
    }
    await sendResetPasswordEmail(
      passwordResetToken[0].email,
      passwordResetToken[0].token
    );
    return { success: "Reset Email sent" };
  });
