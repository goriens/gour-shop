"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import AuthCard from "./AuthCard";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { newPassword } from "@/server/actions/new-password";
import { ResetSchema } from "@/types/reset-schema";
import { resetPassword } from "@/server/actions/password-reset";

export default function ResetForm() {
  const form = useForm({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const { execute, status } = useAction(resetPassword, {
    onSuccess(data) {
      if (data.data?.error) setError(data.data.error);
      if (data.data?.success) setSuccess(data.data.success);
    },
  });

  function onSubmit(values: z.infer<typeof ResetSchema>) {
    execute(values);
  }
  return (
    <AuthCard
      cardTitle="Forgot Your Password"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
      showSocials
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Your Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="name@example.com"
                        type="email"
                        autoComplete="email"
                        disabled={status === "executing"}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormError message={error} />
              <FormSuccess message={success} />
            </div>
            <Button
              type="submit"
              className={`w-full my-2 ${
                status === "executing" ? "animate-pulse" : ""
              }`}
            >
              Send Email
            </Button>
          </form>
        </Form>
      </div>
    </AuthCard>
  );
}
