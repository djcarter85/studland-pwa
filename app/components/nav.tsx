import {
  faCalendar,
  faCircleInfo,
  faCloudSunRain,
  faMap,
  faWater,
} from "@fortawesome/free-solid-svg-icons";
import NavLink from "./nav-link";

export default function Nav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full border-t bg-gray-50 shadow-[0px_0px_6px_2px_#edf2f7] pb-safe">
      <div className="mx-auto flex h-16 max-w-xl flex-row items-center justify-around">
        <NavLink title="Weather" href="/weather" icon={faCloudSunRain} />
        <NavLink title="Tides" href="/tides" icon={faWater} />
        <NavLink title="Map" href="/map" icon={faMap} />
        <NavLink title="Calendar" href="/calendar" icon={faCalendar} />
        <NavLink title="More" href="/more" icon={faCircleInfo} />
      </div>
    </nav>
  );
}
