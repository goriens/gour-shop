import { auth } from "@/server/auth";
import { UserButton } from "./UserButton";
import { Button } from "../ui/button";
import Link from "next/link";
import { BiLogIn } from "react-icons/bi";
import Logo from "./Logo";
import { FaUserPlus } from "react-icons/fa";

export default async function Nav() {
  const session = await auth();

  return (
    <header className="h-16 mb-5 bg-primary flex justify-between items-center px-3">
      <Link href="/" aria-label="Gour Shop logo">
        <Logo />
      </Link>
      {!session ? (
        <li className="flex gap-2">
          <Button variant="secondary" asChild className="flex gap-1">
            <Link href="/auth/register">
              <FaUserPlus size={17} />
              <span>Register</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            asChild
            className="flex gap-1 text-white border"
          >
            <Link href="/auth/login">
              <BiLogIn size={18} />
              <span>Login</span>
            </Link>
          </Button>
        </li>
      ) : (
        <UserButton expires={session?.expires} user={session?.user} />
      )}
    </header>
  );
}
