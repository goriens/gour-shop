"use server";

import getBaseURL from "@/lib/base-url";
import { Resend } from "resend";
const domain = getBaseURL();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Email Confirmation",
    html: `<p>Click to <a href="${confirmLink}">Confirm your email address</a></p>`,
  });

  if (error) return console.log(error);
  if (data) return data;
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-password?token=${token}`;
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset Your Password",
    html: `<p>Click to <a href="${confirmLink}">Reset Your Password</a></p>`,
  });

  if (error) return console.log(error);
  if (data) return data;
};

export const sendTwoFactorTokenByEmail = async (
  email: string,
  token: string
) => {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Two Factor Token",
    html: `<p>Your confirmation Code is ${token}</p>`,
  });

  if (error) return console.log(error);
  if (data) return data;
};
