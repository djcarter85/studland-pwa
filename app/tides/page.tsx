"use client";

import {
  faAnglesDown,
  faAnglesUp,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import useSWR from "swr";
import { DateTime } from "luxon";

function TideRow({
  date,
  type,
  time,
  height,
}: {
  date: string;
  type: string;
  time: string;
  height: string;
}) {
  return (
    <tr
      className={clsx("text-center", {
        "bg-zinc-100": type === "Low",
      })}
    >
      <td className="py-1 font-bold">
        {date ? DateTime.fromISO(date).toFormat("ccc d LLL") : ""}
      </td>
      <td className="py-1 text-3xl">{time}</td>
      <td className="flex flex-col items-center py-1">
        <span
          className={clsx(
            "inline-flex flex-row gap-2 rounded-full px-2 py-1 text-xs w-min",
            {
              "bg-violet-200 text-violet-800": type === "Low",
              "bg-sky-200 text-sky-800": type === "High",
            },
          )}
        >
          <span>
            <FontAwesomeIcon
              icon={type === "Low" ? faAnglesDown : faAnglesUp}
            />
          </span>
          <span className="font-bold uppercase">{type}</span>
        </span>
        <span className="font-bold text-zinc-500">{height}</span>
      </td>
    </tr>
  );
}

function DateBlock({ date, tides }: { date: string; tides: any }) {
  return (
    <>
      {tides.map((t: any, index: number) => (
        <TideRow
          key={t.time}
          date={index == 0 ? date : ""}
          type={t.type}
          time={t.time}
          height={t.height}
        />
      ))}
    </>
  );
}

export default function Tides() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const key =
    "https://raw.githubusercontent.com/djcarter85/studland-data/main/data/tides.json";
  const { data, error, isLoading } = useSWR(key, fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <h1 className="mb-4 mt-2 flex flex-row items-center gap-4 px-4 font-bold">
        <FontAwesomeIcon className="text-xl" icon={faLocationDot} />
        <span className="text-2xl">Studland Bay</span>
      </h1>
      <table className="w-full">
        <tbody>
          {data.dates.map((t: any) => (
            <DateBlock key={t.date} date={t.date} tides={t.tides} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
