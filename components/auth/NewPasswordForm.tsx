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
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { NewPasswordSchema } from "@/types/new-password-schema";
import { newPassword } from "@/server/actions/new-password";
import { useSearchParams } from "next/navigation";

export default function NewPasswordForm() {
  const form = useForm({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  // console.log(token);

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const { execute, status } = useAction(newPassword, {
    onSuccess(data) {
      if (data.data?.error) setError(data.data.error);
      if (data.data?.success) setSuccess(data.data.success);
    },
  });

  function onSubmit(values: z.infer<typeof NewPasswordSchema>) {
    execute({ password: values.password, token });
  }
  return (
    <AuthCard
      cardTitle="Reset Your Password"
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="**********"
                        type="password"
                        autoComplete="current-password"
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
              Reset Password
            </Button>
          </form>
        </Form>
      </div>
    </AuthCard>
  );
}
