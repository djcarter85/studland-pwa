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
import { z } from "zod";
import { dateSchema } from "../schemas/date-schema";

const tideSchema = z.object({
  type: z.string(),
  time: z.string(),
  height: z.string(),
});

type Tide = z.infer<typeof tideSchema>;

const tideDateSchema = z.object({
  date: dateSchema,
  tides: z.array(tideSchema),
});

const tidesSchema = z.object({ dates: z.array(tideDateSchema) });

function TideRow({
  date,
  type,
  time,
  height,
}: {
  date: DateTime | undefined;
  type: string;
  time: string;
  height: string;
}) {
  return (
    <tr className="text-center odd:bg-gray-100 odd:dark:bg-gray-700">
      <td className="py-2 text-lg font-bold">
        {date ? date.toFormat("ccc d LLL") : ""}
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

function DateBlock({ date, tides }: { date: DateTime; tides: Tide[] }) {
  return (
    <>
      {tides.map((t, index) => (
        <TideRow
          key={t.time}
          date={index == 0 ? date : undefined}
          type={t.type}
          time={t.time}
          height={t.height}
        />
      ))}
    </>
  );
}

export default function TidesPage() {
  const { data, lastUpdatedUtc, isLoading } = useData("tides");

  if (!data) {
    return <div>Loading ...</div>;
  }

  const tides = tidesSchema.parse(data);

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
      <table className="w-full">
        <tbody>
          {tides.dates.map((t) => (
            <DateBlock key={t.date.toISO()} date={t.date} tides={t.tides} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
