import { DateTime } from "luxon";
import { ArrowRepeat, CheckCircle } from "react-bootstrap-icons";
import { LoadingState } from "../types/loading-state";

const LoadingIndicator = ({ loadingState }: { loadingState: LoadingState }) => {
  switch (loadingState) {
    case "loading":
      return <ArrowRepeat className="animate-spin" />;
    case "loaded":
      return <CheckCircle className="text-teal-500 dark:text-teal-400" />;
  }
};

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
        <LoadingIndicator loadingState={loadingState} />
      </div>
      <div className="text-sm">
        Last updated {dateTime.toRelative({ style: "long" })}
      </div>
    </div>
  );
}
