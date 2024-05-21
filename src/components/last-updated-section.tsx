import { ArrowRepeat, CheckCircle, XCircle } from "react-bootstrap-icons";
import { LoadingState } from "../types/loading-state";

const LoadingStateText = ({ loadingState }: { loadingState: LoadingState }) => {
  if (loadingState.lastUpdatedUtc) {
    // Ensure the time isn't in the future by subtracting a millisecond.
    const dateTime = loadingState.lastUpdatedUtc.plus({
      milliseconds: -1,
    });

    const dateTimeDescription = dateTime.toRelative({ style: "long" });

    if (loadingState.state == "error") {
      return <>Error (showing data from {dateTimeDescription})</>;
    } else {
      return <>Last updated {dateTimeDescription}</>;
    }
  }

  if (loadingState.state == "error") {
    return <>Error</>;
  } else {
    return <>Loading ...</>;
  }
};

const LoadingIndicator = ({ loadingState }: { loadingState: LoadingState }) => {
  switch (loadingState.state) {
    case "loading":
      return <ArrowRepeat className="animate-spin" />;
    case "loaded":
      return <CheckCircle className="text-teal-500 dark:text-teal-400" />;
    case "error":
      return <XCircle className="text-rose-600 dark:text-rose-400" />;
  }
};

export default function LastUpdatedSection({
  loadingState,
}: {
  loadingState: LoadingState;
}) {
  return (
    <div className="my-3 flex flex-row items-center gap-3 px-3">
      <div className="text-lg">
        <LoadingIndicator loadingState={loadingState} />
      </div>
      <div className="text-sm">
        <LoadingStateText loadingState={loadingState} />
      </div>
    </div>
  );
}
