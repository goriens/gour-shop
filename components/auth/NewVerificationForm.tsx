"use client";

import { newVerification } from "@/server/actions/tokens";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import AuthCard from "./AuthCard";
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";
import Loading from "@/app/loading";

export default function NewVerificationForm() {
  const token = useSearchParams().get("token");
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  console.log(token);

  const handleNewVerification = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("No token found");
      return;
    }
    newVerification(token).then((data) => {
      if (data.error) {
        setError(data.error);
      }
      if (data.success) {
        setSuccess(data.success);
        router.push("/auth/login");
      }
    });
  }, [error, success, router, token]);

  useEffect(() => {
    handleNewVerification();
  }, [handleNewVerification]);

  return (
    <AuthCard
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
      cardTitle="Verify Your Account"
    >
      <div className="text-center">
        <div>{!success && !error ? <Loading /> : null}</div>
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </AuthCard>
  );
}
