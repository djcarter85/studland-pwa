import { Outlet } from "react-router-dom";
import clsx from "clsx";
import { Android2, Apple, BoxArrowUp, PlusSquare } from "react-bootstrap-icons";
import { useTernaryDarkMode } from "usehooks-ts";
import Nav from "./components/nav";
import { useEffect } from "react";

function PwaWarning() {
  return (
    <div className="bg-orange-100 dark:bg-gray-600 pwa:hidden">
      <div className="mx-auto flex max-w-xl flex-col gap-2 border-b-2 border-orange-600 p-4 text-sm font-bold text-orange-900 dark:font-normal dark:text-orange-200">
        <p>This website works best when installed as an app.</p>
        <p>
          <Apple className="mr-1 inline align-baseline" />
          <span>iOS: tap</span>
          <BoxArrowUp className="mx-1 inline align-baseline" />
          <span>Share, then </span>
          <PlusSquare className="mx-1 inline align-baseline" />
          <span>Add to Home Screen.</span>
        </p>
        <p>
          <Android2 className="mr-1 inline align-baseline" />
          <span>Android: instructions coming soon ...</span>
        </p>
      </div>
    </div>
  );
}

export default function Root() {
  const { isDarkMode } = useTernaryDarkMode();

  useEffect(() => {
    document.documentElement.setAttribute("class", clsx({ dark: isDarkMode }));
  }, [isDarkMode]);

  return (
    <>
      <Nav />
      <PwaWarning />
      <main className="mx-auto max-w-xl text-gray-900 pt-safe pb-safe-offset-20 dark:text-gray-100">
        <Outlet />
      </main>
    </>
  );
}
