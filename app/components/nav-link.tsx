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
          "border-teal-600": isActive,
          "border-transparent": !isActive,
        },
      )}
    >
      <FontAwesomeIcon
        className={clsx("text-lg", {
          "text-teal-600": isActive,
          "text-zinc-700": !isActive,
        })}
        icon={icon}
      />
      <div
        className={clsx("text-sm", {
          "text-teal-600": isActive,
          "text-zinc-900": !isActive,
        })}
      >
        {title}
      </div>
    </Link>
  );
}
