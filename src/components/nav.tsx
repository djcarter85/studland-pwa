import {
  InfoCircle,
  Calendar4,
  GeoAlt,
  Water,
  CloudSun,
} from "react-bootstrap-icons";
import NavLink from "./nav-link";

export default function Nav() {
  return (
    <nav className="pb-safe fixed right-0 bottom-0 left-0 w-full border-t border-gray-200 bg-gray-50/80 backdrop-blur-xs dark:border-gray-700 dark:bg-gray-800/80">
      <div className="mx-auto flex h-16 max-w-xl flex-row items-center justify-around">
        <NavLink title="Weather" href="/weather" icon={<CloudSun />} />
        <NavLink title="Tides" href="/tides" icon={<Water />} />
        <NavLink title="Locations" href="/locations" icon={<GeoAlt />} />
        <NavLink title="Calendar" href="/calendar" icon={<Calendar4 />} />
        <NavLink title="Info" href="/info" icon={<InfoCircle />} />
      </div>
    </nav>
  );
}
