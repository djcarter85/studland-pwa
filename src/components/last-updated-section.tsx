import { DateTime } from "luxon";

export default function LastUpdatedSection({
  lastUpdatedUtc,
}: {
  lastUpdatedUtc: string;
}) {
  // Ensure the time isn't in the future by subtracting a millisecond.
  const dateTime = DateTime.fromISO(lastUpdatedUtc).plus({
    milliseconds: -1,
  });

  return (
    <div className="my-3 px-3 text-sm">
      Last updated {dateTime.toRelative({ style: "long" })}
    </div>
  );
}
