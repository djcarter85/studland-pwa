import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/app/components/nav";
import clsx from "clsx";
import { ExclamationCircle } from "react-bootstrap-icons";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(baseFont.className, "bg-gray-50")}>
        <Nav />
        <div className="pwa:hidden bg-orange-100">
          <div className="mx-auto flex max-w-xl flex-row gap-6 p-4 items-center border-b-2 border-orange-600">
            <div className="text-3xl text-orange-600">
              <ExclamationCircle />
            </div>
            <div className="flex flex-col gap-2 text-sm font-bold text-orange-900">
              <p>This website works best when installed as an app.</p>
              <p>
                To do this on an iPhone, click on the &quot;Share&quot; button, then click
                &quot;Add to Home Screen&quot;.
              </p>
            </div>
          </div>
        </div>
        <main className="mx-auto max-w-xl p-2 text-gray-900 mb-safe-offset-16">
          {children}
        </main>
      </body>
    </html>
  );
}
