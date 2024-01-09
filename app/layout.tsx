import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/app/components/nav";
import { config as fontawesomeConfig } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import clsx from "clsx";

const baseFont = DM_Sans({ subsets: ["latin"], weight: ["300", "700"] });

export const metadata: Metadata = {
  title: "Studland Site",
  manifest: "manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#fafafa",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

fontawesomeConfig.autoAddCss = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(baseFont.className, "bg-zinc-50")}>
        <Nav />
        <main className="mx-auto max-w-xl p-3 text-teal-900 mb-safe-offset-16">
          {children}
        </main>
      </body>
    </html>
  );
}
