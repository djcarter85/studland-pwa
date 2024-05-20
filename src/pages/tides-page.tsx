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
import BigDate from "../components/big-date";
import { useState } from "react";

const tideSchema = z.object({
  type: z.enum(["Low", "High"]),
  time: z.string(),
  height: z.string(),
});

type Tide = z.infer<typeof tideSchema>;

const tideDateSchema = z.object({
  date: dateSchema,
  tides: z.array(tideSchema),
});

const tidesSchema = z.object({ dates: z.array(tideDateSchema) });

function TideRow({ tide }: { tide: Tide }) {
  return (
    <tr className="text-center even:bg-gray-100 even:dark:bg-transparent odd:dark:bg-gray-700 odd:transparent">
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
            }
          )}
        >
          <span>
            {tide.type === "Low" ? <ChevronDoubleDown /> : <ChevronDoubleUp />}
          </span>
          <span className="text-xs font-bold uppercase">{tide.type}</span>
        </span>
      </td>
      <td className="py-2 font-bold text-gray-400 dark:text-gray-200 text-xl">
        {tide.height}
      </td>
    </tr>
  );
}

function DateTab({
  data,
  isSelected,
  setSelectedData,
}: {
  data: z.infer<typeof tideDateSchema>;
  isSelected: boolean;
  setSelectedData: (data: z.infer<typeof tideDateSchema>) => void;
}) {
  return (
    <button
      className={clsx("py-2 basis-full border-t-2", {
        "bg-gray-50 dark:bg-gray-700 border-teal-600 dark:border-teal-400":
          isSelected,
        "bg-gray-100 dark:bg-gray-800 border-transparent": !isSelected,
      })}
      onClick={() => setSelectedData(data)}
    >
      <BigDate date={data.date} />
    </button>
  );
}

function PageHeader({ lastUpdatedUtc }: { lastUpdatedUtc: string }) {
  return (
    <>
      <Heading>
        <div className="px-3 flex flex-row items-center gap-3">
          <GeoAltFill className="text-xl" />
          <span className="text-2xl">Studland Bay</span>
          <Hyperlink href="https://www.dorset-tides.com/studland-bay-tide-times">
            <BoxArrowUpRight />
          </Hyperlink>
        </div>
      </Heading>
      <LastUpdatedSection lastUpdatedUtc={lastUpdatedUtc} />
    </>
  );
}

function PageBody({ tides }: { tides: z.infer<typeof tidesSchema> }) {
  const [selectedData, setSelectedData] = useState(tides.dates[0]);

  return (
    <>
      <div className="flex flex-row justify-around">
        {tides.dates.map((d) => (
          <DateTab
            key={d.date.toISO()}
            data={d}
            isSelected={d.date.toISO() === selectedData.date.toISO()}
            setSelectedData={setSelectedData}
          />
        ))}
      </div>
      <table className="w-full">
        <tbody>
          {selectedData.tides.map((t) => (
            <TideRow key={t.time} tide={t} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default function TidesPage() {
  const { data, lastUpdatedUtc } = useData("tides", tidesSchema);

  if (!data) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <PageHeader lastUpdatedUtc={lastUpdatedUtc} />
      <PageBody tides={data} />
    </div>
  );
}
