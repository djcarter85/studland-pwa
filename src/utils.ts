import { DateTime } from "luxon";

const getTodayText = () => {
  return DateTime.now().toISODate();
};

function last<T>(arr: Array<T>) {
  return arr[arr.length - 1];
}

export { getTodayText, last };
