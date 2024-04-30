import { DateTime } from "luxon";
import { z } from "zod";

export const dateSchema = z
  .string()
  .transform((x) => DateTime.fromISO(x))
  .refine((d) => d.isValid, "Invalid DateTime.");
