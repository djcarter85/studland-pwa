import useData from "../hooks/useData";
import { z } from "zod";
import { dateSchema } from "../schemas/date-schema";
import LastUpdatedSection from "../components/last-updated-section";
import Heading from "../components/heading";
import { Calendar } from "react-bootstrap-icons";
import { DateTime } from "luxon";
import clsx from "clsx";

const calendarSchema = z.object({
  year: z.number(),
  startDate: dateSchema,
  endDate: dateSchema,
  events: z.array(
    z
      .object({
        name: z.string(),
        shortName: z.string(),
        startDate: dateSchema,
        endDate: dateSchema,
      })
      .refine((event) => event.startDate <= event.endDate),
  ),
});

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const maxCalendarDays = 3660;
const eventBarHeight = 1.5;

type CalendarEvent = z.infer<typeof calendarSchema>["events"][number];

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

const getEventSegments = (month: Month, events: CalendarEvent[]) =>
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
                  style={{ minHeight: `${3 + segments.length * eventBarHeight}rem` }}
                >
                  {week.map((date) => {
                    const inRange = date >= data.startDate && date <= data.endDate;
                    return inRange ? (
                      <time
                        key={date.toISODate()}
                        dateTime={date.toISODate() ?? undefined}
                        className={clsx(
                          "border-r border-t border-gray-200 px-2 py-2 text-right dark:border-gray-500",
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
                        className="border-r border-t border-gray-200 dark:border-gray-500"
                      />
                    );
                  })}
                  {segments.map((segment, index) => (
                    <div
                      key={`${segment.event.name}-${segment.weekIndex}`}
                      title={`${segment.event.name}: ${segment.event.startDate.toLocaleString()} - ${segment.event.endDate.toLocaleString()}`}
                      className="absolute z-20 truncate rounded-sm bg-teal-600 px-1 text-left text-xs font-bold leading-6 text-white dark:bg-teal-400 dark:text-gray-950"
                      style={{
                        left: `${((segment.startColumn - 1) / 7) * 100}%`,
                        width: `${(segment.span / 7) * 100}%`,
                        top: `${3 + index * eventBarHeight}rem`,
                        height: `${eventBarHeight}rem`,
                      }}
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
