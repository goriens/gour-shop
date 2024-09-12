import DashboardSideBar from "@/components/navigation/DashboardSideBar";
import { auth } from "@/server/auth";
import { BarChart, Package, PenSquare, Truck } from "lucide-react";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  const userLinks = [
    { label: "Orders", path: "/dashboard/orders", icon: <Truck /> },
    { label: "Settings", path: "/dashboard/settings", icon: <Truck /> },
  ] as const;
  const adminLinks =
    session?.user.role === "admin"
      ? [
          {
            label: "Analytics",
            path: "/dashboard/analytics",
            icon: <BarChart />,
          },
          {
            label: "Create",
            path: "/dashboard/add-products",
            icon: <PenSquare />,
          },
          {
            label: "Products",
            path: "/dashboard/products",
            icon: <Package />,
          },
        ]
      : [];

  const allLinks = [...userLinks, ...adminLinks];
  return (
    <div className="flex md:flex-row flex-col mb-5 mx-2 md:container gap-2">
      <DashboardSideBar allLinks={allLinks} />
      {children}
    </div>
  );
}
