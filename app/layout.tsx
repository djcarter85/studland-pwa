import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/app/components/nav";
import clsx from "clsx";
import { Android2, Apple, ExclamationCircle } from "react-bootstrap-icons";

const baseFont = DM_Sans({ subsets: ["latin"], weight: ["300", "700"] });

export const metadata: Metadata = {
  title: "Studland Site",
  manifest: "manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#f5f6f6",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

function PwaWarning() {
  return (
    <div className="bg-orange-100 pwa:hidden">
      <div className="mx-auto flex max-w-xl flex-col gap-2 border-b-2 border-orange-600 p-4 text-sm font-bold text-orange-900">
        <p>This website works best when installed as an app.</p>
        <p>
          <Apple className="mr-1 inline align-baseline" />
          <span>
            iPhone: click on the &quot;Share&quot; button, then click &quot;Add
            to Home Screen&quot;.
          </span>
        </p>
        <p>
          <Android2 className="mr-1 inline align-baseline" />
          <span>Android: instructions coming soon ...</span>
        </p>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(baseFont.className, "bg-gray-50")}>
        <Nav />
        <PwaWarning />
        <main className="mx-auto max-w-xl p-2 text-gray-900 mb-safe-offset-16">
          {children}
        </main>
      </body>
    </html>
  );
}
