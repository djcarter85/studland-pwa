"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function NavLink({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: IconProp;
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
          "border-transparent text-zinc-800": !isActive,
        },
      )}
    >
      <FontAwesomeIcon className="text-lg" icon={icon} />
      <div className="text-sm">{title}</div>
    </Link>
  );
}
