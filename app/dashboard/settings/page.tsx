import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import SettingsCard from "./SettingsCard";

export default async function page() {
  const session = await auth();
  if (!session) redirect("/auth/login");

  return (
    <div className="flex-1">
      <SettingsCard session={session} />
    </div>
  );
}
