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

function NavLink({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: IconProp;
}) {
  return (
    <Link
      key={title}
      href={href}
      className="relative flex flex-col h-full basis-full cursor-pointer items-center justify-center gap-2 text-teal-50 hover:bg-teal-600"
    >
      <FontAwesomeIcon icon={icon} />
      <div className="text-xs">{title}</div>
    </Link>
  );
}

export default function Nav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full bg-teal-500 pb-safe">
      <div className="max-w-xl flex flex-row items-center justify-around h-16 mx-auto">
        <NavLink title="Weather" href="/weather" icon={faHome} />
        <NavLink title="Tides" href="/tides" icon={faWater} />
        <NavLink title="Map" href="/map" icon={faMap} />
        <NavLink title="Calendar" href="/calendar" icon={faCalendar} />
        <NavLink title="More" href="/more" icon={faCircleInfo} />
      </div>
    </nav>
  );
}
