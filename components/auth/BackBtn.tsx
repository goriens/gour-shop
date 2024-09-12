"use client";
import Link from "next/link";
import { Button } from "../ui/button";
type BackButtonType = {
  href: string;
  label: string;
};

export default function BackBtn({ href, label }: BackButtonType) {
  return (
    <Button asChild variant="link" className="w-full">
      <Link aria-label={label} href={href}>
        {label}
      </Link>
    </Button>
  );
}
