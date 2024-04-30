import { DateTime, Duration } from "luxon";
import useData from "../hooks/useData";
import clsx from "clsx";
import BigDate from "../components/big-date";
import { z } from "zod";

const dateSchema = z
  .string()
  .transform((x) => DateTime.fromISO(x))
  .refine((d) => d.isValid, "Invalid DateTime.");

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

function DateRow({ date, events }: { date: DateTime; events: Event[] }) {
  const events2 = events.filter((e) => {
    return e.startDate <= date && e.endDate >= date;
  });

  return (
    <>
      <div
        className={clsx(
          "py-2 px-4 border-gray-200 dark:border-gray-500 border-b",
          {
            "bg-gray-100 dark:bg-gray-700": isWeekend(date),
          }
        )}
      >
        <BigDate date={date} />
      </div>
      <div
        className={clsx(
          "flex flex-col border-gray-200 dark:border-gray-500 border-b",
          {
            "bg-gray-100 dark:bg-gray-700": isWeekend(date),
          }
        )}
      >
        {events2.map((e) => (
          <div
            className={clsx(
              "text-xl h-full border-l-8 px-4 flex items-center",
              {
                "border-teal-300/80 dark:border-teal-300/60":
                  e.name === "Dorset Venture" || e.name === "Family Camp 1",
                "border-violet-300/80 dark:border-violet-300/60":
                  e.name === "Studland Venture" || e.name === "Family Camp 2",
                "border-sky-300/80 dark:border-sky-300/60":
                  e.name === "Purbeck Venture" || e.name === "Family Camp 3",
              }
            )}
            key={e.name}
          >
            <div>{e.name}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function Table({ dates, events }: { dates: DateTime[]; events: Event[] }) {
  return (
    <div className="w-full border-gray-200 dark:border-gray-500 border-t grid grid-cols-[min-content_1fr]">
      {dates.map((d) => (
        <DateRow key={d.toISO()} date={d} events={events} />
      ))}
    </div>
  );
}

export default function CalendarPage() {
  const { data } = useData("calendar");

  // todo make period configurable
  const dates = getPeriod(
    DateTime.fromISO("2024-07-20"),
    DateTime.fromISO("2024-08-31")
  );

  if (!data) {
    return <div>loading</div>;
  }

  const calendar = calendarSchema.parse(data);

  return (
    <div className="my-3">
      <Table dates={dates} events={calendar.events} />
    </div>
  );
}
