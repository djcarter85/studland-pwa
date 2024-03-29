import { useEffect, useState } from "react";

// TODO: report fetching errors
// TODO: reload on refocus
export default function useData(url: string) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const cacheKey = "cache:" + url;

  useEffect(() => {
    const fetchAndCache = async () => {
      const cachedValue = localStorage.getItem(cacheKey);

      if (cachedValue) {
        try {
          setData(JSON.parse(cachedValue));
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
        setData(fetchedValue);
      }

      localStorage.setItem(cacheKey, JSON.stringify(fetchedValue));
    };
    fetchAndCache();
  }, [url]);

  return { data, isLoading };
}
