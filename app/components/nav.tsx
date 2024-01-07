import Link from "next/link";

function NavLink({ href, title }: { href: string; title: string }) {
  return (
    <li>
      <Link key={title} href={href}>
        {title}
      </Link>
    </li>
  );
}

export default function Nav() {
  return (
    <nav>
      <ul>
        <NavLink title="Weather" href="/weather" />
        <NavLink title="Tides" href="/tides" />
        <NavLink title="Map" href="/map" />
        <NavLink title="Calendar" href="/calendar" />
        <NavLink title="More" href="/more" />
      </ul>
    </nav>
  );
}
