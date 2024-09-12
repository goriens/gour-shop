"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { useForm } from "react-hook-form";
import { SettingsSchema } from "@/types/settings-schema";
import { z } from "zod";
import Image from "next/image";
import FormError from "@/components/auth/FormError";
import FormSuccess from "@/components/auth/FormSuccess";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useAction } from "next-safe-action/hooks";
import { settings } from "@/server/actions/settings";
import { UploadButton } from "@/app/api/uploadthing/uplaod";

interface SettingCardType {
  session: Session;
}

export default function SettingsCard(session: SettingCardType) {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      name: session.session.user?.name || "",
      email: session.session.user?.email || "",
      image: session.session.user.image || "",
      isTwoFactorEnabled: session.session.user?.isTwoFactorEnabled || false,
    },
  });

  const { execute, status } = useAction(settings, {
    onSuccess(data) {
      console.log(data);
      if (data.data?.success) setSuccess(data.data.success);
      if (data.data?.error) setError(data.data.error);
    },
  });
  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    execute(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Settings</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Deo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <div className="flex justify-between items-center">
                    {!form.getValues("image") && (
                      <div>
                        {session.session.user?.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    {form.getValues("image") && (
                      <Image
                        src={form.getValues("image")!}
                        alt="user-image"
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                    )}
                    <UploadButton
                      className="scale-75 ring-primary"
                      endpoint="avatarUploader"
                      onClientUploadComplete={(res) => {
                        form.setValue("image", res[0].url!);
                      }}
                      onUploadError={(error: Error) => {
                        form.setError("image", {
                          type: "validate",
                          message: error.message,
                        });
                      }}
                    />
                  </div>
                  <FormControl>
                    <Input placeholder="User Image" {...field} type="hidden" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="**********"
                      {...field}
                      disabled={session.session.user.isOAuth}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="**********"
                      {...field}
                      disabled={session.session.user.isOAuth}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isTwoFactorEnabled"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Two Factor Authentication</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Switch
                        disabled={session.session.user.isOAuth}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      Enable Two Factor Authentication
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit">Update Settings</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
