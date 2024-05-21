import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { z } from "zod";
import { LoadingState } from "../types/loading-state";

// TODO: report fetching errors
// TODO: reload on refocus
export default function useData<T extends z.ZodTypeAny>(
  key: string,
  schema: T,
) {
  const [data, setData] = useState<z.infer<typeof schema>>(null);
  const [lastUpdatedUtc, setLastUpdatedUtc] = useState<string>("");
  const [loadingState, setLoadingState] = useState<LoadingState>("loading");

  const url = `${import.meta.env.VITE_DATA_URL}/djcarter85/studland-data/main/data/${key}.json`;
  const internalCacheKey = "cache:" + key;

  const cacheSchema = z.object({
    lastUpdatedUtc: z.string(),
    data: schema,
  });

  useEffect(() => {
    const fetchAndCache = async () => {
      const cachedValue = localStorage.getItem(internalCacheKey);

      if (cachedValue) {
        try {
          const parseResult = cacheSchema.safeParse(JSON.parse(cachedValue));

          if (parseResult.success) {
            setLastUpdatedUtc(parseResult.data.lastUpdatedUtc);
            setData(parseResult.data.data);
          }
        } catch {
          // If the data from the cache cannot be parsed, this is not a problem
          // because we're about to fetch. We can just leave it "loading" for
          // now.
        }
      }

      try {
        setLoadingState("loading");

        const response = await fetch(url);
        const json = await response.json();
        const parseResult = schema.safeParse(json);

        if (parseResult.success) {
          const nowUtc = DateTime.now().toISO();

          setLastUpdatedUtc(nowUtc);
          setData(parseResult.data);

          localStorage.setItem(
            internalCacheKey,
            JSON.stringify({ lastUpdatedUtc: nowUtc, data: parseResult.data }),
          );
        }
      } finally {
        setLoadingState("loaded");
      }
    };

    fetchAndCache();
  }, [url, schema]);

  return { data, lastUpdatedUtc, loadingState };
}
