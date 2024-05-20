import clsx from "clsx";
import Hyperlink from "../components/hyperlink";
import { Laptop, Moon, Sun } from "react-bootstrap-icons";
import { useTernaryDarkMode } from "usehooks-ts";
import { ReactNode } from "react";

function Subheading({ children }: { children: React.ReactNode }) {
  return <h2 className="mx-2 my-3 text-lg font-bold">{children}</h2>;
}

function Ul({ children }: { children: React.ReactNode }) {
  return <ul className="mb-3 ml-4 mr-2 list-inside list-disc">{children}</ul>;
}

function Bullet({ children }: { children: React.ReactNode }) {
  return <li>{children}</li>;
}

function Para({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={clsx("mx-2 mb-4", className)}>{children}</p>;
}

function ColourSchemeOption({
  name,
  icon,
  mode,
}: {
  name: string;
  icon: ReactNode;
  mode: "light" | "dark" | "system";
}) {
  const { ternaryDarkMode, setTernaryDarkMode } = useTernaryDarkMode();

  return (
    <button
      className={clsx(
        "flex flex-row items-center justify-center gap-2 rounded-lg border border-gray-300 px-2 py-2 text-center dark:border-gray-500",
        { "ring-2 ring-teal-400 dark:bg-gray-700": mode === ternaryDarkMode },
      )}
      onClick={() => setTernaryDarkMode(mode)}
    >
      {icon}
      <span>{name}</span>
    </button>
  );
}

function ColourSchemeChooser() {
  return (
    <div className="mx-2 mb-4 grid grid-cols-3 justify-center gap-2">
      <ColourSchemeOption icon={<Sun />} name="Light" mode="light" />
      <ColourSchemeOption icon={<Moon />} name="Dark" mode="dark" />
      <ColourSchemeOption icon={<Laptop />} name="System" mode="system" />
    </div>
  );
}

export default function InfoPage() {
  return (
    <div className="p-2">
      <Subheading>Useful links</Subheading>
      <Ul>
        <Bullet>
          <Hyperlink href="https://www.biblegateway.com/">
            Online Bible
          </Hyperlink>
        </Bullet>
        <Bullet>
          <Hyperlink href="https://studlandholidays.org.uk/">
            Studland Holidays
          </Hyperlink>
        </Bullet>
        <Bullet>
          <Hyperlink href="https://www.urbansaints.org/">
            Urban Saints
          </Hyperlink>
        </Bullet>
        <Bullet>
          <Hyperlink href="https://www.facebook.com/StudlandHolidays">
            Studland Camp Site Friends (Facebook)
          </Hyperlink>
        </Bullet>
      </Ul>
      <Subheading>Colour scheme</Subheading>
      <ColourSchemeChooser />
      <Subheading>About this app</Subheading>
      <Para>
        Made by Dan and Laura Carter. If you have any questions or suggestions,
        please email{" "}
        <Hyperlink href="mailto:djcarter85@gmail.com">
          djcarter85@gmail.com
        </Hyperlink>
        .
      </Para>
    </div>
  );
}
