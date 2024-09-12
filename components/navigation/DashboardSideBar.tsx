"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function DashboardSideBar({
  allLinks,
}: {
  allLinks: { label: string; path: string; icon: JSX.Element }[];
}) {
  const pathname = usePathname();
  return (
    <aside className="md:w-72 bg-card border rounded-md overflow-auto">
      <ul className="flex md:flex-col md:gap-2 gap-1 p-1">
        {allLinks.map((link) => (
          <motion.li key={link.label}>
            <Link
              href={link.path}
              className={`flex md:flex-row transition-all flex-col items-center md:gap-2 md:p-3 p-2 rounded-sm hover:bg-secondary/50 ${
                pathname === link.path && "bg-secondary"
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          </motion.li>
        ))}
      </ul>
    </aside>
  );
}

{
  /* <aside className="py-2 overflow-auto px-4 md:px-12 max-w-3xl m-auto">
<ul className="flex gap-6 text-sm font-semibold">
  {allLinks.map((link) => (
    <li key={link.label}>
      <Link
        href={link.path}
        className={`flex flex-col items-center p-2 rounded-md transition ${
          pathname === link.path && "bg-secondary"
        }`}
      >
        {link.icon}
        {link.label}
      </Link>
    </li>
  ))}
</ul>
</aside> */
}
