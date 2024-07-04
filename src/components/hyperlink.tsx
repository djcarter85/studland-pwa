import { ReactNode } from "react";
import clsx from "clsx";

export default function Hyperlink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      className={clsx("text-teal-600 underline hover:no-underline dark:text-teal-400", className)}
      href={href}
    >
      {children}
    </a>
  );
}
