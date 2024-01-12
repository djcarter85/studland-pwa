import { ReactNode } from "react";

export default function Hyperlink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a className="text-teal-500 underline hover:no-underline" href={href}>
      {children}
    </a>
  );
}
