"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

export default function Socials() {
  return (
    <div className="flex flex-col items-center w-full gap-2">
      <Button
        variant="outline"
        className="flex gap-2 w-full"
        onClick={() => signIn("google", { redirect: false, callbackUrl: "/" })}
      >
        <FcGoogle />
        <span>Sign in with Google</span>
      </Button>
      <Button
        variant="outline"
        className="flex gap-2 w-full"
        onClick={() => signIn("github", { redirect: false, callbackUrl: "/" })}
      >
        <BsGithub />
        <span>Sign in with Github</span>
      </Button>
    </div>
  );
}
