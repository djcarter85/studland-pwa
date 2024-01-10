"use client";

import clsx from "clsx";
import useSWR from "swr";
import { DateTime } from "luxon";
import Heading from "../components/heading";
import { ChevronDoubleDown, ChevronDoubleUp, GeoAltFill } from "react-bootstrap-icons";

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
        "bg-gray-100": type === "Low",
      })}
    >
      <td className="py-2 text-lg font-bold">
        {date ? DateTime.fromISO(date).toFormat("ccc d LLL") : ""}
      </td>
      <td
        className={clsx("border-l-8 py-2 text-3xl", {
          "border-violet-300": type === "Low",
          "border-sky-300": type === "High",
        })}
      >
        {time}
      </td>
      <td className="flex flex-col items-center py-2">
        <span
          className={clsx(
            "inline-flex w-min flex-row items-center gap-2 rounded-full px-2 py-1",
            {
              "bg-violet-200 text-violet-800": type === "Low",
              "bg-sky-200 text-sky-800": type === "High",
            },
          )}
        >
          <span>
            {type === "Low" ? <ChevronDoubleDown /> : <ChevronDoubleUp />}
          </span>
          <span className="font-bold uppercase text-xs">{type}</span>
        </span>
        <span className="font-bold text-gray-500">{height}</span>
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
      <Heading>
        <div className="mx-2 mt-2 flex flex-row items-center gap-3">
          <GeoAltFill className="text-xl" />
          <span className="text-2xl">Studland Bay</span>
        </div>
      </Heading>
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
