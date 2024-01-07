import Link from "next/link";

function NavLink({ href, title }: { href: string; title: string }) {
  return (
    <Link
      key={title}
      href={href}
      className="relative flex h-full basis-full cursor-pointer flex-col items-center justify-center gap-1  text-teal-50 text-sm hover:bg-teal-600"
    >
      {title}
    </Link>
  );
}

export default function Nav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0  w-full  h-16 bg-teal-500 ">
      <div className="max-w-xl flex flex-row items-center justify-around h-full mx-auto">
        <NavLink title="Weather" href="/weather" />
        <NavLink title="Tides" href="/tides" />
        <NavLink title="Map" href="/map" />
        <NavLink title="Calendar" href="/calendar" />
        <NavLink title="More" href="/more" />
      </div>
    </nav>
  );
}
