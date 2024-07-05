import { DateTime } from "luxon";
import BigDate from "./big-date";
import clsx from "clsx";

const DateTab = ({
  date,
  isSelected,
  setUserSelectedDate,
}: {
  date: DateTime;
  isSelected: boolean;
  setUserSelectedDate: (date: DateTime) => void;
}) => {
  return (
    <button
      className={clsx("basis-full border-t-2 py-2", {
        "border-teal-600 bg-gray-50 dark:border-teal-400 dark:bg-gray-700":
          isSelected,
        "border-transparent bg-gray-100 dark:bg-gray-800": !isSelected,
      })}
      onClick={() => setUserSelectedDate(date)}
    >
      <BigDate date={date} />
    </button>
  );
};

const DateTabs = ({
  dates,
  selectedDate,
  setUserSelectedDate,
}: {
  dates: DateTime[];
  selectedDate: DateTime;
  setUserSelectedDate: (date: DateTime) => void;
}) => {
  return (
    <div className="flex flex-row justify-around">
      {dates.map((d) => (
        <DateTab
          key={d.toISO()}
          date={d}
          isSelected={d === selectedDate}
          setUserSelectedDate={setUserSelectedDate}
        />
      ))}
    </div>
  );
};

export { DateTabs };
