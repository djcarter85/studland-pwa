"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCircleInfo,
  faHome,
  faMap,
  faWater,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { usePathname } from "next/navigation";
import clsx from "clsx";

function NavLink({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: IconProp;
}) {
  const pathName = usePathname();
  const isActive = pathName === href;

  return (
    <Link
      key={title}
      href={href}
      className={clsx("relative flex h-full basis-full cursor-pointer flex-col items-center justify-center gap-2 text-teal-950", isActive && "text-teal-600")}
    >
      <FontAwesomeIcon icon={icon} />
      <div className="text-xs">{title}</div>
    </Link>
  );
}

export default function Nav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full border-t bg-zinc-50 shadow-[0px_0px_6px_2px_#edf2f7] pb-safe">
      <div className="mx-auto flex h-16 max-w-xl flex-row items-center justify-around">
        <NavLink title="Weather" href="/weather" icon={faHome} />
        <NavLink title="Tides" href="/tides" icon={faWater} />
        <NavLink title="Map" href="/map" icon={faMap} />
        <NavLink title="Calendar" href="/calendar" icon={faCalendar} />
        <NavLink title="More" href="/more" icon={faCircleInfo} />
      </div>
    </nav>
  );
}
