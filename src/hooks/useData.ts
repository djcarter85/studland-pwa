import { DateTime } from "luxon";
import { useEffect, useState } from "react";

// TODO: report fetching errors
// TODO: reload on refocus
export default function useData(url: string, cacheKey: string) {
  const [data, setData] = useState<any>(null);
  const [lastUpdatedUtc, setLastUpdatedUtc] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const internalCacheKey = "cache:" + cacheKey;

  useEffect(() => {
    const fetchAndCache = async () => {
      const cachedValue = localStorage.getItem(internalCacheKey);

      if (cachedValue) {
        try {
          const json = JSON.parse(cachedValue);
          setLastUpdatedUtc(json.lastUpdatedUtc);
          setData(json.data);
        } catch {
          // If the JSON parsing doesn't work, that's fine because we're about to fetch.
        }
      }

      let fetchedValue: string;
      try {
        setIsLoading(true);

        const response = await fetch(url);
        const json = await response.json();
        fetchedValue = json;
      } finally {
        setIsLoading(false);
      }

      if (fetchedValue) {
        const nowUtc = DateTime.now().toISO();

        setLastUpdatedUtc(nowUtc);
        setData(fetchedValue);

        localStorage.setItem(
          internalCacheKey,
          JSON.stringify({ lastUpdatedUtc: nowUtc, data: fetchedValue })
        );
      }
    };
    fetchAndCache();
  }, [url]);

  return { data, lastUpdatedUtc, isLoading };
}
