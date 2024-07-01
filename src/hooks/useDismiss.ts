import { DateTime, Duration } from "luxon";
import { useLocalStorage } from "usehooks-ts";

const useDismiss = (key: string, dismissDuration: Duration) => {
  const [value, setValue] = useLocalStorage<{
    lastDismissedUtc: string;
  } | null>(`dismiss:${key}`, null);

  const nowUtc = DateTime.now().toUTC();

  let isVisible: boolean;
  if (!value) {
    isVisible = true;
  } else {
    const lastDismissedUtc = DateTime.fromISO(value.lastDismissedUtc);
    isVisible =
      !lastDismissedUtc.isValid ||
      nowUtc > lastDismissedUtc.plus(dismissDuration);
  }

  const dismiss = () => {
    setValue({ lastDismissedUtc: nowUtc.toISO() });
  };

  return { isVisible, dismiss };
};

export { useDismiss };
