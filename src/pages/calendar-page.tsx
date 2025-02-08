import { DateTime, Duration } from "luxon";
import useData from "../hooks/useData";
import clsx from "clsx";
import BigDate from "../components/big-date";
import { z } from "zod";
import { dateSchema } from "../schemas/date-schema";
import LastUpdatedSection from "../components/last-updated-section";
import { getTodayText } from "../utils";

const eventSchema = z.object({
  name: z.string(),
  startDate: dateSchema,
  endDate: dateSchema,
});

type Event = z.infer<typeof eventSchema>;

const calendarSchema = z.object({ events: z.array(eventSchema) });

function isWeekend(date: DateTime) {
  return date.weekday === 6 || date.weekday === 7;
}

function getPeriod(firstDate: DateTime, lastDate: DateTime): DateTime[] {
  if (firstDate > lastDate) {
    throw RangeError("The first date cannot be after the last date.");
  }

  const dates: DateTime[] = [];

  let date = firstDate;
  while (date <= lastDate) {
    dates.push(date);
    date = date.plus(Duration.fromObject({ days: 1 }));
  }

  return dates;
}

const dayDiff = (start: DateTime, end: DateTime) =>
  end.diff(start, ["days", "hours"]).toObject().days ?? 0;

const DateEvent = ({ evt, date }: { evt: Event; date: DateTime }) => {
  const dayNumber = dayDiff(evt.startDate, date) + 1;
  const eventLength = dayDiff(evt.startDate, evt.endDate) + 1;

  return (
    <div
      className={clsx("flex h-full items-center border-l-8 px-4 text-xl", {
        "border-sky-400 bg-sky-200 dark:border-sky-600 dark:bg-sky-700/60":
          evt.name === "Dorset Venture" || evt.name === "Family Camp 1",
        "border-violet-400 bg-violet-200 dark:border-violet-500/80 dark:bg-violet-700/60":
          evt.name === "Studland Venture" || evt.name === "Family Camp 2",
        "border-teal-400 bg-teal-200 dark:border-teal-600 dark:bg-teal-700/60":
          evt.name === "Purbeck Venture" || evt.name === "Family Camp 3",
        "border-gray-400 bg-gray-200 dark:border-gray-500 dark:bg-gray-700/60":
          evt.name === "Site set up" || evt.name === "Site pack down",
      })}
    >
      <div>
        {evt.name} ({dayNumber}/{eventLength})
      </div>
    </div>
  );
};

function DateRow({
  date,
  isToday,
  events,
}: {
  date: DateTime;
  isToday: boolean;
  events: Event[];
}) {
  const events2 = events.filter((e) => {
    return e.startDate <= date && e.endDate >= date;
  });

  return (
    <>
      <div
        className={clsx(
          "border-b border-gray-200 px-4 py-2 dark:border-gray-500",
          {
            "bg-amber-200/40 dark:bg-amber-600/30": isWeekend(date),
          },
        )}
      >
        <BigDate date={date} />
      </div>
      <div
        className={clsx(
          "flex flex-col border-b border-gray-300 dark:border-gray-500",
          {
            "border-r-[16px] border-r-rose-400 dark:border-r-rose-700/60": isToday,
          },
        )}
      >
        {events2.map((e) => (
          <DateEvent key={e.name} evt={e} date={date} />
        ))}
      </div>
    </>
  );
}

function Table({ dates, events }: { dates: DateTime[]; events: Event[] }) {
  const todayText = getTodayText();
  return (
    <div className="grid w-full grid-cols-[min-content_1fr] border-t border-gray-200 dark:border-gray-500">
      {dates.map((d) => (
        <DateRow
          key={d.toISO()}
          date={d}
          isToday={d.toISODate() === todayText}
          events={events}
        />
      ))}
    </div>
  );
}

export default function CalendarPage() {
  const { data, loadingState } = useData("calendar", calendarSchema);

  // todo make period configurable
  const dates = getPeriod(
    DateTime.fromISO("2025-07-19"),
    DateTime.fromISO("2025-08-31"),
  );

  if (
    !data &&
    (loadingState.state === "loading" || loadingState.state === "error")
  ) {
    return <LastUpdatedSection loadingState={loadingState} />;
  }

  return (
    <div>
      <Table dates={dates} events={data!.events} />
    </div>
  );
}
