import clsx from "clsx";
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
import { useState } from "react";
import { DateTime } from "luxon";
import { LoadingState } from "../types/loading-state";
import { DateTabs } from "../components/date-tabs";
import { getTodayText, last } from "../utils";

const tideSchema = z.object({
  type: z.enum(["Low", "High"]),
  time: z.string(),
  heightInMetres: z.number(),
  instant: z.string().transform((x) => DateTime.fromISO(x)),
});

type Tide = z.infer<typeof tideSchema>;

const tideDateSchema = z.object({
  date: dateSchema,
  tides: z.array(tideSchema),
});

const tidesSchema = z.object({ dates: z.array(tideDateSchema) });

function TideRow({ tide }: { tide: Tide }) {
  return (
    <tr className="odd:transparent text-center even:bg-gray-100 odd:dark:bg-gray-700 even:dark:bg-transparent">
      <td className="py-2 text-3xl">{tide.time}</td>
      <td className="py-2">
        <span
          className={clsx(
            "inline-flex w-min flex-row items-center gap-2 rounded-full px-2 py-1",
            {
              "bg-violet-200 text-violet-800 dark:bg-violet-300/70 dark:text-violet-950":
                tide.type === "Low",
              "bg-sky-200 text-sky-800 dark:bg-sky-300/70 dark:text-sky-950":
                tide.type === "High",
            },
          )}
        >
          <span>
            {tide.type === "Low" ? <ChevronDoubleDown /> : <ChevronDoubleUp />}
          </span>
          <span className="text-xs font-bold uppercase">{tide.type}</span>
        </span>
      </td>
      <td className="py-2 text-xl font-bold text-gray-400 dark:text-gray-200">
        {tide.heightInMetres}m
      </td>
    </tr>
  );
}

function PageHeader({ loadingState }: { loadingState: LoadingState }) {
  return (
    <>
      <Heading>
        <div className="flex flex-row items-center gap-3 px-3">
          <GeoAltFill className="text-xl" />
          <span className="text-2xl">Studland Bay</span>
          <Hyperlink href="https://www.dorset-tides.com/studland-bay-tide-times">
            <BoxArrowUpRight />
          </Hyperlink>
        </div>
      </Heading>
      <LastUpdatedSection loadingState={loadingState} />
    </>
  );
}

const TidesTable = ({
  selectedData,
}: {
  selectedData: z.infer<typeof tideDateSchema>;
}) => {
  return (
    <table className="w-full">
      <tbody>
        {selectedData.tides.map((t) => (
          <TideRow key={t.time} tide={t} />
        ))}
      </tbody>
    </table>
  );
};

const getTideDirection = (nextTideType: "Low" | "High") => {
  switch (nextTideType) {
    case "Low":
      return "Falling";
    case "High":
      return "Rising";
  }
};

const CurrentTide = ({ tides }: { tides: z.infer<typeof tidesSchema> }) => {
  const now = DateTime.now();
  const nextTide = tides.dates
    .flatMap((x) => x.tides)
    .find((x) => now < x.instant);

  if (!nextTide) {
    return <></>;
  }

  const diff = nextTide.instant
    .diff(now, ["hours", "minutes", "seconds"])
    .toObject();

  const tideTypeClassName = clsx("font-bold uppercase", {
    "text-violet-600 dark:text-violet-300": nextTide.type === "Low",
    "text-sky-600 dark:text-sky-300": nextTide.type === "High",
  });

  return (
    <div className="border-t p-3 text-lg">
      <div>
        The tide is currently{" "}
        <span className={tideTypeClassName}>
          {getTideDirection(nextTide.type)}
        </span>
        .
      </div>
      <div>
        <span className={tideTypeClassName}>{nextTide.type}</span> tide is in{" "}
        <span className="font-bold">
          {diff.hours}hr {diff.minutes}min
        </span>
        , at <span className="font-bold">{nextTide.time}</span>.
      </div>
    </div>
  );
};

function PageBody({ tides }: { tides: z.infer<typeof tidesSchema> | null }) {
  if (!tides) {
    return <></>;
  }

  const todayText = getTodayText();

  const [userSelectedDate, setUserSelectedDate] = useState<DateTime | null>(
    null,
  );
  const selectedData =
    tides.dates.find((d) => d.date === userSelectedDate) ??
    tides.dates.find((d) => d.date.toISODate() === todayText) ??
    last(tides.dates);

  return (
    <>
      <CurrentTide tides={tides} />
      <DateTabs
        dates={tides.dates.map((d) => d.date)}
        selectedDate={selectedData.date}
        setUserSelectedDate={setUserSelectedDate}
      />
      <TidesTable selectedData={selectedData} />
    </>
  );
}

export default function TidesPage() {
  const { data, loadingState } = useData("tides", tidesSchema);

  return (
    <div>
      <PageHeader loadingState={loadingState} />
      <PageBody tides={data} />
    </div>
  );
}
