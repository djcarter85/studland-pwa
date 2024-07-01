import { Outlet } from "react-router-dom";
import clsx from "clsx";
import { useTernaryDarkMode } from "usehooks-ts";
import Nav from "./components/nav";
import { useEffect } from "react";
import { PwaWarning } from "./components/pwa-warning";
import { StatusBar } from "./components/status-bar";

const Layout = () => {
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
};

export { Layout };
