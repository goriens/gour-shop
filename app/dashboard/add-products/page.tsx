import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import ProductForm from "./ProductForm";

export default async function AddProducts() {
  const session = await auth();
  if (session?.user.role !== "admin") return redirect("/dashboard/settings");

  return (
    <div className="flex-1">
      <ProductForm />
    </div>
  );
}
