"use server";

import { LoginSchema } from "@/types/login-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "@/server";
import { eq } from "drizzle-orm";
import { twoFactorTokens, users } from "../schema";
import {
  generateEmailVerificationToken,
  generateTwoFactorToken,
  getTwoFactorTokenByEmail,
} from "./tokens";
import { sendTwoFactorTokenByEmail, sendVerificationEmail } from "./email";
import { signIn } from "../auth";
import { AuthError } from "next-auth";

const actionClient = createSafeActionClient();

export const emailSignIn = actionClient
  .schema(LoginSchema)
  .action(async ({ parsedInput: { email, password, code } }) => {
    try {
      console.log(code);
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });
      if (existingUser?.email !== email) {
        return { error: "Email not found" };
      }
      if (!existingUser.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(email);
        await sendVerificationEmail(
          verificationToken[0].email,
          verificationToken[0].token
        );
        return { success: "Confirmation Email Sent Again" };
      }

      if (existingUser.twoFactorEnabled && existingUser.email) {
        if (code) {
          const twoFactorToken = await getTwoFactorTokenByEmail(
            existingUser.email
          );
          if (!twoFactorToken) {
            return { error: "Invalid Token" };
          }
          if (twoFactorToken.token !== code) {
            return { error: "Invalid Token or code" };
          }
          const hasExpired = new Date(twoFactorToken.expires) < new Date();
          if (hasExpired) {
            return { error: "Token has been expired" };
          }
          await db
            .delete(twoFactorTokens)
            .where(eq(twoFactorTokens.id, twoFactorToken.id));

          const existingConfirmation = await getTwoFactorTokenByEmail(
            existingUser.email
          );
          if (existingConfirmation) {
            await db
              .delete(twoFactorTokens)
              .where(eq(twoFactorTokens.email, twoFactorToken.email));
          }
        } else {
          const newTwoFactorToken = await generateTwoFactorToken(
            existingUser.email
          );
          if (!newTwoFactorToken) {
            return { error: "Token not found or wrong" };
          }
          if (newTwoFactorToken) {
            await sendTwoFactorTokenByEmail(
              newTwoFactorToken[0].email,
              newTwoFactorToken[0].token
            );
            return { twoFactor: "Two Factor Token Sent!" };
          }
        }
      }

      await signIn("credentials", {
        email,
        password,
        redirectTo: "/",
      });
      return { success: "Email to shi h" };
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Invalid Email or Password" };
          case "AccessDenied":
            return { error: error.message };
          case "OAuthSignInError":
            return { error: error.message };
          default:
            return { error: error.message };
        }
      }
      throw error;
    }
  });
