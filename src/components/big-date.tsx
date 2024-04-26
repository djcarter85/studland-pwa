import { DateTime } from "luxon";

export default function BigDate({ date }: { date: DateTime }) {
  return (
    <div className="flex flex-col items-center">
      <div className="leading-none text-lg">{date.toFormat("ccc")}</div>
      <div className="leading-none text-3xl font-bold my-0.5">
        {date.toFormat("dd")}
      </div>
      <div className="leading-none text-lg">{date.toFormat("LLLL")}</div>
    </div>
  );
}
