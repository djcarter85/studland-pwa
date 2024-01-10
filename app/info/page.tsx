import clsx from "clsx";
import Heading from "../components/heading";

function Subheading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 text-lg font-bold">{children}</h2>;
}

function Ul({ children }: { children: React.ReactNode }) {
  return <ul className="mb-3 ml-2 list-inside list-disc">{children}</ul>;
}

function Bullet({ children }: { children: React.ReactNode }) {
  return <li>{children}</li>;
}

function Hyperlink({ href, text }: { href: string; text: string }) {
  return (
    <a className="text-teal-500 underline hover:no-underline" href={href}>
      {text}
    </a>
  );
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
          <Hyperlink href="https://www.biblegateway.com/" text="Online Bible" />
        </Bullet>
        <Bullet>
          <Hyperlink
            href="https://studlandholidays.org.uk/"
            text="Studland Holidays"
          />
        </Bullet>
        <Bullet>
          <Hyperlink href="https://www.urbansaints.org/" text="Urban Saints" />
        </Bullet>
        <Bullet>
          <Hyperlink
            href="https://www.facebook.com/StudlandHolidays"
            text="Studland Camp Site Friends (Facebook)"
          />
        </Bullet>
      </Ul>
      <Subheading>About this app</Subheading>
      <Para>
        Made by Dan and Laura Carter. If you have any questions or suggestions,
        please email{" "}
        <Hyperlink
          href="mailto:djcarter85@gmail.com"
          text="djcarter85@gmail.com"
        />
        .
      </Para>
      <Para className="text-gray-300">
        Deployment ID:{" "}
        {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.substring(0, 7)}
      </Para>
    </div>
  );
}
