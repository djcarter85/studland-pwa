import { DateTime } from "luxon";
import { ArrowRepeat, CheckCircle } from "react-bootstrap-icons";
import { LoadingState } from "../types/loading-state";

export default function LastUpdatedSection({
  loadingState,
  lastUpdatedUtc,
}: {
  loadingState: LoadingState;
  lastUpdatedUtc: string;
}) {
  // Ensure the time isn't in the future by subtracting a millisecond.
  const dateTime = DateTime.fromISO(lastUpdatedUtc).plus({
    milliseconds: -1,
  });

  return (
    <div className="my-3 flex flex-row items-center gap-3 px-3">
      <div className="text-lg">
        {loadingState == "loading" ? (
          <ArrowRepeat className="animate-spin" />
        ) : (
          <CheckCircle className="text-teal-500 dark:text-teal-400" />
        )}
      </div>
      <div className="text-sm">
        Last updated {dateTime.toRelative({ style: "long" })}
      </div>
    </div>
  );
}
