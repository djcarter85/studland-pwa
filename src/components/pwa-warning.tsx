import { Duration } from "luxon";
import { useDismiss } from "../hooks/useDismiss";
import { XLg } from "react-bootstrap-icons";

const PwaWarning = () => {
  const { isVisible, dismiss } = useDismiss(
    "pwa-warning",
    Duration.fromObject({ weeks: 1 }),
  );

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-orange-100 dark:bg-gray-600 pwa:hidden">
      <div className="mx-auto flex max-w-xl flex-row items-center gap-2 border-b-2 border-orange-600 p-4 text-sm font-bold text-orange-900 dark:font-normal dark:text-orange-200">
        <p>
          This website works best when installed as an app. You can do this by
          choosing "Add to home screen" from your browser's menu.
        </p>
        <button
          className="rounded-lg bg-orange-300 p-2 text-xl hover:bg-orange-400"
          onClick={(_) => dismiss()}
        >
          <XLg />
        </button>
      </div>
    </div>
  );
};

export { PwaWarning };
