import clsx from "clsx";
import Heading from "../components/heading";
import Hyperlink from "../components/hyperlink";

function Subheading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 text-lg font-bold">{children}</h2>;
}

function Ul({ children }: { children: React.ReactNode }) {
  return <ul className="mb-3 ml-2 list-inside list-disc">{children}</ul>;
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
  return <p className={clsx("mb-4", className)}>{children}</p>;
}

export default function More() {
  return (
    <div className="p-2">
      <Heading>More Information</Heading>
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
      <Subheading>About this app</Subheading>
      <Para>
        Made by Dan and Laura Carter. If you have any questions or suggestions,
        please email{" "}
        <Hyperlink href="mailto:djcarter85@gmail.com">
          djcarter85@gmail.com
        </Hyperlink>
        .
      </Para>
      <Para className="text-gray-300">
        Deployment ID:{" "}
        {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.substring(0, 7)}
      </Para>
    </div>
  );
}
