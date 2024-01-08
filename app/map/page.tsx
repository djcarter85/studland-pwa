"use client";

import { usePathname } from "next/navigation";

export default function Map() {
  const pathname = usePathname();
  return <div>Map {pathname}</div>;
}
