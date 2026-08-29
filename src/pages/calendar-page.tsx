import useData from "../hooks/useData";
import { z } from "zod";
import { dateSchema } from "../schemas/date-schema";
import LastUpdatedSection from "../components/last-updated-section";
import Heading from "../components/heading";
import { Calendar } from "react-bootstrap-icons";
import { DateTime } from "luxon";
import clsx from "clsx";

const eventSchema = z
  .object({
    name: z.string(),
    shortName: z.string(),
    startDate: dateSchema,
    endDate: dateSchema,
  })
  .refine((event) => event.startDate <= event.endDate);

type Event = z.infer<typeof eventSchema>;

const calendarSchema = z.object({
  year: z.number(),
  startDate: dateSchema,
  endDate: dateSchema,
  events: z.array(eventSchema),
});

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const maxCalendarDays = 3660;

const getMonths = (startDate: DateTime, endDate: DateTime) => {
  if (startDate > endDate) {
    return [];
  }

  const dayCount = endDate.diff(startDate, "days").days;
  if (!Number.isFinite(dayCount) || dayCount > maxCalendarDays) {
    return [];
  }

  const months: {
    key: string;
    title: string;
    dates: DateTime[];
    startBlanks: number;
    endBlanks: number;
  }[] = [];
  let monthStart = startDate.startOf("month");

  while (monthStart <= endDate) {
    const firstDate = monthStart < startDate ? startDate : monthStart;
    const monthEnd = monthStart.endOf("month");
    const lastDate = monthEnd > endDate ? endDate : monthEnd;
    const dates: DateTime[] = [];

    for (
      let date = firstDate;
      date <= lastDate;
      date = date.plus({ days: 1 })
    ) {
      dates.push(date);
    }

    months.push({
      key: monthStart.toFormat("yyyy-MM"),
      title: monthStart.toFormat("LLLL"),
      dates,
      startBlanks: firstDate.weekday - 1,
      endBlanks: 7 - lastDate.weekday,
    });
    monthStart = monthStart.plus({ months: 1 }).startOf("month");
  }

  return months;
};

const CalendarDateCell = ({
  date,
  events,
}: {
  date: DateTime;
  events: Event[];
}) => {
  const dateKey = date.toISODate();

  return (
    <div
      key={dateKey ?? date.toISO()}
      className={clsx(
        "min-h-12 border-r border-t border-gray-200 px-2 py-2 dark:border-gray-500",
        {
          "relative z-10 font-bold ring-2 ring-inset ring-teal-500":
            date.hasSame(DateTime.now(), "day"),
        },
        { "border-r-0": date.weekday === 7 },
      )}
    >
      <time dateTime={dateKey ?? undefined} className="block text-right">
        {date.day}
      </time>
      {events.length > 0 && (
        <div className="mt-1 flex flex-col items-stretch gap-1">
          {events.map((event) => (
            <span
              key={`${dateKey}-${event.name}`}
              className="inline-flex max-w-full items-center justify-center overflow-hidden rounded-full bg-teal-100 px-1.5 py-0.5 text-[10px] font-medium text-teal-800"
              title={event.name}
            >
              {event.shortName}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const Table = ({ data }: { data: z.infer<typeof calendarSchema> }) => {
  const eventsByDate = new Map<string, Event[]>();

  for (const event of data.events) {
    let current = event.startDate;

    while (current <= event.endDate) {
      const key = current.toISODate();
      if (key) {
        const existingEvents = eventsByDate.get(key) ?? [];
        existingEvents.push(event);
        eventsByDate.set(key, existingEvents);
      }

      current = current.plus({ days: 1 });
    }
  }

  return (
    <div className="border-t border-gray-200 dark:border-gray-500">
      {getMonths(data.startDate, data.endDate).map((month) => (
        <section key={month.key} aria-labelledby={`month-${month.key}`}>
          <h2 id={`month-${month.key}`} className="px-3 py-3 text-xl font-bold">
            {month.title}
          </h2>
          <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-500">
            {weekdays.map((weekday) => (
              <div
                key={weekday}
                className="border-gray-200 px-1 py-1 text-center text-sm font-bold dark:border-gray-500"
              >
                {weekday}
              </div>
            ))}
            {Array.from({ length: month.startBlanks }, (_, index) => (
              <div
                key={`empty-start-${index}`}
                aria-hidden="true"
                className="min-h-12 border-r border-t border-gray-200 dark:border-gray-500"
              />
            ))}
            {month.dates.map((date) => {
              const dateKey = date.toISODate();
              const events = dateKey ? (eventsByDate.get(dateKey) ?? []) : [];

              return (
                <CalendarDateCell
                  key={dateKey ?? date.toISO()}
                  date={date}
                  events={events}
                />
              );
            })}
            {Array.from({ length: month.endBlanks }, (_, index) => (
              <div
                key={`empty-end-${index}`}
                aria-hidden="true"
                className="min-h-12 border-r border-t border-gray-200 last:border-r-0 dark:border-gray-500"
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

const CalendarPage = () => {
  const { data, loadingState } = useData("calendar", calendarSchema);

  if (
    !data &&
    (loadingState.state === "loading" || loadingState.state === "error")
  ) {
    return <LastUpdatedSection loadingState={loadingState} />;
  }

  return (
    <div>
      <Heading>
        <div className="flex flex-row items-center gap-3 px-3">
          <Calendar className="text-xl" />
          <span className="text-2xl">{data!.year}</span>
        </div>
      </Heading>
      <Table data={data!} />
    </div>
  );
};

export default CalendarPage;
