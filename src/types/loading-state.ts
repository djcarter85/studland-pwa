import { DateTime } from "luxon";

export type LoadingState =
  | { state: "loading"; lastUpdatedUtc: DateTime | null }
  | { state: "loaded"; lastUpdatedUtc: DateTime }
  | { state: "error"; lastUpdatedUtc: DateTime | null };
