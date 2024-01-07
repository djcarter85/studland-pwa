import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/app/components/nav";
import { config as fontawesomeConfig } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Studland Site",
  manifest: "manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#14b8a6",
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
      <body className={clsx(inter.className, "bg-teal-50")}>
        <Nav />
        <main className="pb-16">
          <div className="max-w-xl mx-auto mb-safe p-3 text-teal-950">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
