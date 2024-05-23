import { ReactNode } from "react";

export default function Hyperlink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      className="text-teal-600 underline hover:no-underline dark:text-teal-400"
      href={href}
    >
      {children}
    </a>
  );
}
