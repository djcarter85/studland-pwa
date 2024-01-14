"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ReactNode } from "react";

export default function NavLink({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      key={title}
      href={href}
      className={clsx(
        "relative flex h-full basis-full cursor-pointer flex-col items-center justify-center gap-1 border-t-2",
        {
          "border-teal-600 text-teal-600": isActive,
          "border-transparent text-gray-900": !isActive,
        },
      )}
    >
      <div className="text-xl">{icon}</div>
      <div className="text-sm">{title}</div>
    </Link>
  );
}
