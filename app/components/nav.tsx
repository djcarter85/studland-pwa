import { GeoAltFill, InfoCircle, Calendar, Map, Water, CloudSun } from "react-bootstrap-icons";
import NavLink from "./nav-link";

export default function Nav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full border-t bg-gray-50 shadow-[0px_0px_6px_2px_#edf2f7] pb-safe">
      <div className="mx-auto flex h-16 max-w-xl flex-row items-center justify-around">
        <NavLink title="Weather" href="/weather" icon={<CloudSun />} />
        <NavLink title="Tides" href="/tides" icon={<Water />} />
        <NavLink title="Map" href="/map" icon={<Map />} />
        <NavLink title="Calendar" href="/calendar" icon={<Calendar />} />
        <NavLink title="Info" href="/info" icon={<InfoCircle />} />
      </div>
    </nav>
  );
}
