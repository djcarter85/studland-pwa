import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { z } from "zod";

// TODO: report fetching errors
// TODO: reload on refocus
export default function useData<T extends z.ZodTypeAny>(
  key: string,
  schema: T,
) {
  const [data, setData] = useState<z.infer<typeof schema>>(null);
  const [lastUpdatedUtc, setLastUpdatedUtc] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

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
        const parseResult = cacheSchema.safeParse(cachedValue);

        if (parseResult.success) {
          setLastUpdatedUtc(parseResult.data.lastUpdatedUtc);
          setData(parseResult.data.data);
        } else {
          // If the data from the cache cannot be parsed, this is not a problem
          // because we're about to fetch. We can just leave it "loading" for
          // now.
        }
      }

      try {
        setIsLoading(true);

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
        setIsLoading(false);
      }
    };

    fetchAndCache();
  }, [url, schema]);

  return { data, lastUpdatedUtc, isLoading };
}
