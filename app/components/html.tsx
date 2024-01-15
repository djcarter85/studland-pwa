"use client";

import clsx from "clsx";
import { ReactNode } from "react";
import { useTernaryDarkMode } from "usehooks-ts";

export default function Html({ children }: { children: ReactNode }) {
  const { isDarkMode } = useTernaryDarkMode();

  return (
    <html lang="en" className={clsx({ dark: isDarkMode })}>
      {children}
    </html>
  );
}
