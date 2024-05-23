import { DateTime, Duration } from "luxon";
import useData from "../hooks/useData";
import clsx from "clsx";
import BigDate from "../components/big-date";
import { z } from "zod";
import { dateSchema } from "../schemas/date-schema";
import LastUpdatedSection from "../components/last-updated-section";

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
        "border-teal-300/80 dark:border-teal-300/60":
          evt.name === "Dorset Venture" || evt.name === "Family Camp 1",
        "border-violet-300/80 dark:border-violet-300/60":
          evt.name === "Studland Venture" || evt.name === "Family Camp 2",
        "border-sky-300/80 dark:border-sky-300/60":
          evt.name === "Purbeck Venture" || evt.name === "Family Camp 3",
      })}
    >
      <div>
        {evt.name} ({dayNumber}/{eventLength})
      </div>
    </div>
  );
};

function DateRow({ date, events }: { date: DateTime; events: Event[] }) {
  const events2 = events.filter((e) => {
    return e.startDate <= date && e.endDate >= date;
  });

  return (
    <>
      <div
        className={clsx(
          "border-b border-gray-200 px-4 py-2 dark:border-gray-500",
          {
            "bg-gray-100 dark:bg-gray-700": isWeekend(date),
          },
        )}
      >
        <BigDate date={date} />
      </div>
      <div
        className={clsx(
          "flex flex-col border-b border-gray-200 dark:border-gray-500",
          {
            "bg-gray-100 dark:bg-gray-700": isWeekend(date),
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
  return (
    <div className="grid w-full grid-cols-[min-content_1fr] border-t border-gray-200 dark:border-gray-500">
      {dates.map((d) => (
        <DateRow key={d.toISO()} date={d} events={events} />
      ))}
    </div>
  );
}

export default function CalendarPage() {
  const { data, loadingState } = useData("calendar", calendarSchema);

  // todo make period configurable
  const dates = getPeriod(
    DateTime.fromISO("2024-07-20"),
    DateTime.fromISO("2024-08-31"),
  );

  if (
    !data &&
    (loadingState.state === "loading" || loadingState.state === "error")
  ) {
    return <LastUpdatedSection loadingState={loadingState} />;
  }

  return (
    <div className="my-3">
      <Table dates={dates} events={data!.events} />
    </div>
  );
}
