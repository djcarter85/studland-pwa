import clsx from "clsx";
import { DateTime } from "luxon";
import Heading from "../components/heading";
import {
  BoxArrowUpRight,
  ChevronDoubleDown,
  ChevronDoubleUp,
  GeoAltFill,
} from "react-bootstrap-icons";
import Hyperlink from "../components/hyperlink";
import useData from "../hooks/useData";
import LastUpdatedSection from "../components/last-updated-section";

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
    <tr className="text-center odd:bg-gray-100 odd:dark:bg-gray-700">
      <td className="py-2 text-lg font-bold">
        {date ? DateTime.fromISO(date).toFormat("ccc d LLL") : ""}
      </td>
      <td
        className={clsx("border-l-8 py-2 text-3xl", {
          "border-violet-300/80 dark:border-violet-300/60": type === "Low",
          "border-sky-300/80 dark:border-sky-300/60": type === "High",
        })}
      >
        {time}
      </td>
      <td className="flex flex-col items-center py-2">
        <span
          className={clsx(
            "inline-flex w-min flex-row items-center gap-2 rounded-full px-2 py-1",
            {
              "bg-violet-200 text-violet-800 dark:bg-violet-300/70 dark:text-violet-950":
                type === "Low",
              "bg-sky-200 text-sky-800 dark:bg-sky-300/70 dark:text-sky-950":
                type === "High",
            }
          )}
        >
          <span>
            {type === "Low" ? <ChevronDoubleDown /> : <ChevronDoubleUp />}
          </span>
          <span className="text-xs font-bold uppercase">{type}</span>
        </span>
        <span className="font-bold text-gray-500 dark:text-gray-300">
          {height}
        </span>
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

export default function TidesPage() {
  const url =
    "https://raw.githubusercontent.com/djcarter85/studland-data/main/data/tides.json";

  const { data, lastUpdatedUtc, isLoading } = useData(url, "tides");

  return (
    <div>
      <Heading>
        <div className="px-3 flex flex-row items-center gap-3">
          <GeoAltFill className="text-xl" />
          <span className="text-2xl">Studland Bay</span>
          <Hyperlink href="https://www.dorset-tides.com/studland-bay-tide-times">
            <BoxArrowUpRight />
          </Hyperlink>
        </div>
      </Heading>
      {isLoading && <div>Loading ...</div>}
      <LastUpdatedSection lastUpdatedUtc={lastUpdatedUtc} />
      {data && data.dates && (
        <table className="w-full">
          <tbody>
            {data.dates.map((t: any) => (
              <DateBlock key={t.date} date={t.date} tides={t.tides} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
