import { DateTime } from "luxon";
import useData from "../hooks/useData";
import clsx from "clsx";
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

  return (
    <Cell>
      <div
        className={clsx("w-full text-center text-base", {
          "bg-rose-300 font-bold": date.toISODate() === getTodayText(),
        })}
      >
        {date.day}
      </div>
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

const EventList = ({ events }: { events: Event[] }) => {
  return (
    <ul className="mx-3 my-4 flex flex-col gap-1">
      {events.map((evt) => (
        <li key={evt.shortName}>
          {evt.shortName}: {evt.name}
        </li>
      ))}
    </ul>
  );
};

const Cal = ({ data }: { data: z.infer<typeof calendarSchema> }) => {
  // TODO calculate the months to display based on startDate and endDate, rather than hardcoding July and August
  return (
    <>
      <Month data={data} month={7} />
      <Month data={data} month={8} />
      <EventList events={data!.events} />
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
    </div>
  );
};

export default CalendarPage;
