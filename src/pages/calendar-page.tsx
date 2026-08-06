import { DateTime, Duration } from "luxon";
import useData from "../hooks/useData";
import clsx from "clsx";
import BigDate from "../components/big-date";
import { z } from "zod";
import { dateSchema } from "../schemas/date-schema";
import LastUpdatedSection from "../components/last-updated-section";
import { getTodayText } from "../utils";
import Heading from "../components/heading";
import { Calendar } from "react-bootstrap-icons";

const eventSchema = z.object({
  name: z.string(),
  shortName: z.string(),
  startDate: dateSchema,
  endDate: dateSchema,
});

type Event = z.infer<typeof eventSchema>;

const calendarSchema = z.object({
  year: z.number(),
  startDate: dateSchema,
  endDate: dateSchema,
  events: z.array(eventSchema),
});

const isWeekend = (date: DateTime) => date.weekday === 6 || date.weekday === 7;

const getDatesInPeriod = (
  firstDate: DateTime,
  lastDate: DateTime,
): DateTime[] => {
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
};

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

const DateRow = ({
  date,
  isToday,
  events,
}: {
  date: DateTime;
  isToday: boolean;
  events: Event[];
}) => {
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
            "border-r-[16px] border-r-rose-400 dark:border-r-rose-700/60":
              isToday,
          },
        )}
      >
        {events2.map((e) => (
          <DateEvent key={e.name} evt={e} date={date} />
        ))}
      </div>
    </>
  );
};

const Table = ({ data }: { data: z.infer<typeof calendarSchema> }) => {
  const dates = getDatesInPeriod(data.startDate, data.endDate);
  const todayText = getTodayText();
  return (
    <div className="grid w-full grid-cols-[min-content_1fr] border-t border-gray-200 dark:border-gray-500">
      {dates.map((d) => (
        <DateRow
          key={d.toISO()}
          date={d}
          isToday={d.toISODate() === todayText}
          events={data.events}
        />
      ))}
    </div>
  );
};

const Cell = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx("flex flex-col items-center py-1", className)}>
      {children}
    </div>
  );
};

const WeekdayHeader = ({ weekday }: { weekday: string }) => {
  return (
    <Cell>
      <div className="text-xs font-bold">{weekday}</div>
    </Cell>
  );
};

const Spacer = () => {
  return (
    <Cell>
      <div>&nbsp;</div>
    </Cell>
  );
};

const Day = ({ date, events }: { date: DateTime; events: Event[] }) => {
  const eventsOnThisDay = events.filter((e) => {
    return e.startDate <= date && e.endDate >= date;
  });

  // TODO highlight today
  return (
    <Cell className="border border-gray-200 dark:border-gray-500">
      <div className="text-base">{date.day}</div>
      <div className="flex w-full flex-row justify-stretch">
        {eventsOnThisDay.map((e) => (
          <div
            key={e.name}
            className={clsx("flex-1 text-center", {
              "bg-sky-200  dark:bg-sky-700/60":
                e.name === "Dorset Venture" || e.name === "Family Camp 1",
              "bg-violet-200  dark:bg-violet-700/60":
                e.name === "Studland Venture" || e.name === "Family Camp 2",
              "bg-teal-200  dark:bg-teal-700/60":
                e.name === "Purbeck Venture" || e.name === "Family Camp 3",
              "bg-gray-200  dark:bg-gray-700/60":
                e.name === "Site set up" || e.name === "Site pack down",
            })}
          >
            {e.shortName}
          </div>
        ))}
      </div>
    </Cell>
  );
};

const MonthHeader = ({ year, month }: { year: number; month: number }) => {
  const firstDayOfMonth = DateTime.fromObject({ year, month, day: 1 });

  return (
    <h2 className="mx-2 my-2 text-lg font-bold">
      {firstDayOfMonth.toFormat("MMMM")}
    </h2>
  );
};

const Month = ({
  data,
  month,
}: {
  data: z.infer<typeof calendarSchema>;
  month: number;
}) => {
  const firstDayOfMonth = DateTime.fromObject({
    year: data.year,
    month,
    day: 1,
  });

  if (!firstDayOfMonth.isValid) {
    throw new Error(`Invalid year/month: ${data.year}/${month}`);
  }

  const daysInMonth = Array.from(
    { length: firstDayOfMonth.daysInMonth },
    (_, i) => firstDayOfMonth.plus({ days: i }),
  ).filter((d) => d >= data.startDate && d <= data.endDate);

  // TODO: can this be done with CSS grid instead of a spacer component?
  const spacerCount = daysInMonth[0].weekday - 1; // weekday is 1 (Monday) to 7 (Sunday)

  return (
    <>
      <MonthHeader year={data.year} month={month} />
      <div className="grid grid-cols-7 gap-0.5">
        <WeekdayHeader weekday="Mon" />
        <WeekdayHeader weekday="Tue" />
        <WeekdayHeader weekday="Wed" />
        <WeekdayHeader weekday="Thu" />
        <WeekdayHeader weekday="Fri" />
        <WeekdayHeader weekday="Sat" />
        <WeekdayHeader weekday="Sun" />
        {Array.from({ length: spacerCount }).map((_, i) => (
          <Spacer key={i} />
        ))}
        {daysInMonth.map((day) => (
          <Day key={day.toISO()} date={day} events={data.events} />
        ))}
      </div>
    </>
  );
};

const Cal = ({ data }: { data: z.infer<typeof calendarSchema> }) => {
  // TODO calculate the months to display based on startDate and endDate, rather than hardcoding July and August
  // TODO add event list
  return (
    <>
      <Month data={data} month={7} />
      <Month data={data} month={8} />
    </>
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
      <Cal data={data!} />
      <Table data={data!} />
    </div>
  );
};

export default CalendarPage;
