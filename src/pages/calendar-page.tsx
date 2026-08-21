import useData from "../hooks/useData";
import { z } from "zod";
import { dateSchema } from "../schemas/date-schema";
import LastUpdatedSection from "../components/last-updated-section";
import Heading from "../components/heading";
import { Calendar } from "react-bootstrap-icons";
import { DateTime } from "luxon";

const calendarSchema = z.object({
  year: z.number(),
  startDate: dateSchema,
  endDate: dateSchema,
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

  const months: { key: string; title: string; dates: DateTime[]; offset: number }[] = [];
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
      title: monthStart.toFormat("LLLL yyyy"),
      dates,
      offset: firstDate.weekday - 1,
    });
    monthStart = monthStart.plus({ months: 1 }).startOf("month");
  }

  return months;
};

const Table = ({ data }: { data: z.infer<typeof calendarSchema> }) => {
  return (
    <div className="border-t border-gray-200 dark:border-gray-500">
      {getMonths(data.startDate, data.endDate).map((month) => (
        <section key={month.key} aria-labelledby={`month-${month.key}`}>
          <h2
            id={`month-${month.key}`}
            className="px-3 py-2 text-xl font-bold"
          >
            {month.title}
          </h2>
          <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-500">
            {weekdays.map((weekday) => (
              <div
                key={weekday}
                className="border-r border-gray-200 px-1 py-2 text-center text-sm font-bold last:border-r-0 dark:border-gray-500"
              >
                {weekday}
              </div>
            ))}
            {Array.from({ length: month.offset }, (_, index) => (
              <div
                key={`empty-${index}`}
                aria-hidden="true"
                className="min-h-12 border-r border-t border-gray-200 dark:border-gray-500"
              />
            ))}
            {month.dates.map((date) => (
              <time
                key={date.toISODate()}
                dateTime={date.toISODate() ?? undefined}
                className="min-h-12 border-r border-t border-gray-200 px-2 py-2 text-right last:border-r-0 dark:border-gray-500"
              >
                {date.day}
              </time>
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
