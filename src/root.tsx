import { Outlet } from "react-router-dom";
import clsx from "clsx";
import { useTernaryDarkMode } from "usehooks-ts";
import Nav from "./components/nav";
import { useEffect } from "react";
import { XLg } from "react-bootstrap-icons";
import { Duration } from "luxon";
import { useDismiss } from "./hooks/useDismiss";

function PwaWarning() {
  const { isVisible, dismiss } = useDismiss(
    "pwa-warning",
    Duration.fromObject({ weeks: 1 }),
  );

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-orange-100 dark:bg-gray-600 pwa:hidden">
      <div className="mx-auto flex max-w-xl flex-row items-center gap-2 border-b-2 border-orange-600 p-4 text-sm font-bold text-orange-900 dark:font-normal dark:text-orange-200">
        <p>
          This website works best when installed as an app. You can do this by
          choosing "Add to home screen" from your browser's menu.
        </p>
        <button
          className="rounded-lg bg-orange-300 p-2 text-xl hover:bg-orange-400"
          onClick={(_) => dismiss()}
        >
          <XLg />
        </button>
      </div>
    </div>
  );
}

const StatusBar = () => {
  return (
    <div className="fixed left-0 right-0 top-0 w-full bg-gray-50/80 backdrop-blur-sm pt-safe dark:bg-gray-900/80"></div>
  );
};

export default function Root() {
  const { isDarkMode } = useTernaryDarkMode();

  useEffect(() => {
    document.documentElement.setAttribute("class", clsx({ dark: isDarkMode }));
  }, [isDarkMode]);

  return (
    <>
      <StatusBar />
      <Nav />
      <PwaWarning />
      <main className="mx-auto max-w-xl text-gray-900 pt-safe pb-safe-offset-20 dark:text-gray-100">
        <Outlet />
      </main>
    </>
  );
}
