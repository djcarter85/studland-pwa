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
const colStartClasses = [
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
const colSpanClasses = [
  "col-span-1",
  "col-span-2",
  "col-span-3",
  "col-span-4",
  "col-span-5",
  "col-span-6",
  "col-span-7",
];
const eventRowClasses = [
  "row-start-2",
  "row-start-3",
  "row-start-4",
  "row-start-5",
  "row-start-6",
  "row-start-7",
  "row-start-8",
  "row-start-9",
  "row-start-10",
  "row-start-11",
  "row-start-12",
  "row-start-13",
  "row-start-14",
  "row-start-15",
  "row-start-16",
  "row-start-17",
  "row-start-18",
  "row-start-19",
  "row-start-20",
  "row-start-21",
];

const getEventSegmentClassName = (
  segment: {
    startColumn: number;
    span: number;
  },
  index: number,
) =>
  clsx(
    "text-white z-20 mt-1 truncate rounded-sm bg-teal-600 px-1 text-left text-xs font-bold leading-6 dark:bg-teal-400 dark:text-gray-950",
    colStartClasses[segment.startColumn - 1],
    colSpanClasses[Math.min(segment.span - 1, colSpanClasses.length - 1)],
    eventRowClasses[Math.min(index, eventRowClasses.length - 1)],
  );

type Month = {
  key: string;
  title: string;
  startDate: DateTime;
  endDate: DateTime;
  weeks: DateTime[][];
};

const getMonths = (startDate: DateTime, endDate: DateTime) => {
  if (startDate > endDate) {
    return [];
  }

  const dayCount = endDate.diff(startDate, "days").days;
  if (!Number.isFinite(dayCount) || dayCount > maxCalendarDays) {
    return [];
  }

  const months: Month[] = [];
  let monthStart = startDate.startOf("month");

  while (monthStart <= endDate) {
    const firstDate = monthStart < startDate ? startDate : monthStart;
    const monthEnd = monthStart.endOf("month");
    const lastDate = monthEnd > endDate ? endDate : monthEnd;
    const firstWeek = firstDate.minus({ days: firstDate.weekday - 1 });
    const weeks: DateTime[][] = [];
    for (
      let weekStart = firstWeek;
      weekStart <= lastDate;
      weekStart = weekStart.plus({ weeks: 1 })
    ) {
      weeks.push(
        Array.from({ length: 7 }, (_, index) =>
          weekStart.plus({ days: index }),
        ),
      );
    }

    months.push({
      key: monthStart.toFormat("yyyy-MM"),
      title: monthStart.toFormat("LLLL"),
      startDate: firstDate,
      endDate: lastDate,
      weeks,
    });
    monthStart = monthStart.plus({ months: 1 }).startOf("month");
  }

  return months;
};

const getEventSegments = (month: Month, events: Event[]) =>
  month.weeks.flatMap((week, weekIndex) => {
    const weekStart = week[0];
    const weekEnd = week[6];

    return events
      .filter(
        (event) =>
          event.startDate <= weekEnd &&
          event.endDate >= weekStart &&
          event.startDate <= month.endDate &&
          event.endDate >= month.startDate,
      )
      .map((event) => {
        const start = [event.startDate, weekStart, month.startDate].reduce(
          (latest, date) => (date > latest ? date : latest),
        );
        const end = [event.endDate, weekEnd, month.endDate].reduce(
          (earliest, date) => (date < earliest ? date : earliest),
        );

        return {
          event,
          weekIndex,
          startColumn: start.weekday,
          span: end.diff(start, "days").days + 1,
        };
      });
  });

const Table = ({ data }: { data: z.infer<typeof calendarSchema> }) => {
  const today = DateTime.now();
  const months = getMonths(data.startDate, data.endDate);

  return (
    <div className="border-t border-gray-200 dark:border-gray-500">
      {months.map((month) => (
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
            {month.weeks.map((week, weekIndex) => {
              const segments = getEventSegments(month, data.events).filter(
                (segment) => segment.weekIndex === weekIndex,
              );

              return (
                <div
                  key={week[0].toISODate()}
                  className="relative col-span-7 grid grid-cols-7"
                >
                  {week.map((date) => {
                    const inRange =
                      date >= data.startDate && date <= data.endDate;
                    return inRange ? (
                      <time
                        key={date.toISODate()}
                        dateTime={date.toISODate() ?? undefined}
                        className={clsx(
                          "row-start-1 border-r border-t border-gray-200 px-2 py-2 text-right dark:border-gray-500",
                          {
                            "relative z-10 font-bold ring-2 ring-inset ring-teal-500":
                              date.hasSame(today, "day"),
                          },
                          { "border-r-0": date.weekday === 7 },
                        )}
                      >
                        {date.day}
                      </time>
                    ) : (
                      <div
                        key={date.toISODate()}
                        aria-hidden="true"
                        className="row-start-1 border-r border-t border-gray-200 dark:border-gray-500"
                      />
                    );
                  })}
                  {segments.map((segment, index) => (
                    <div
                      key={`${segment.event.name}-${segment.weekIndex}-${segment.startColumn}-${segment.span}`}
                      title={`${segment.event.name}: ${segment.event.startDate.toLocaleString()} - ${segment.event.endDate.toLocaleString()}`}
                      className={clsx(
                        "text-white mt-1 truncate rounded-sm bg-teal-600 px-1 text-left text-xs font-bold leading-6 dark:bg-teal-400 dark:text-gray-950",
                        getEventSegmentClassName(segment, index),
                      )}
                      aria-label={`${segment.event.name}, ${segment.event.startDate.toLocaleString()} to ${segment.event.endDate.toLocaleString()}`}
                    >
                      {segment.event.shortName}
                    </div>
                  ))}
                </div>
              );
            })}
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
