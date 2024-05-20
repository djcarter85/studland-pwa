import { DateTime } from "luxon";

export default function BigDate({ date }: { date: DateTime }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-lg leading-none">{date.toFormat("ccc")}</div>
      <div className="my-0.5 text-3xl font-bold leading-none">
        {date.toFormat("dd")}
      </div>
      <div className="text-lg leading-none">{date.toFormat("LLLL")}</div>
    </div>
  );
}
