import { useEffect, useMemo, useRef, useState } from "react";

const Stale_time = 5 * 60 * 1000; // 5 minutes in milliseconds

const MAX_RETRIES = 3;

const INITIAL_RETRY_DELAY = 1000; // 1 second

interface CacheEntry<T> {
  data: T;
  lastFetched: number;
}

const useCustomFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const storageKey = useMemo((): string => `cache_${url}`, [url]);

  const abortControllerRef = useRef<AbortController | null>(null);

  const retryTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    abortControllerRef.current = new AbortController();
    const fetchData = async (currentRetry = 0): Promise<void> => {
      const currnetTime = new Date().getTime();
      const cachedItem = localStorage.getItem(storageKey);
      // 캐시된 데이터가 있고, 캐시가 유효한 경우
      if (cachedItem) {
        try {
          const cachedDate: CacheEntry<T> = JSON.parse(cachedItem);
          // 캐시된 데이터가 유효한 경우, 캐시된 데이터를 사용
          if (currnetTime - cachedDate.lastFetched < Stale_time) {
            setData(cachedDate.data);
            setIsPending(false);
            console.log("Using cached data", url);
            return;
          }
          setData(cachedDate.data);
          console.log("Using stale cached data", url);
        } catch {
          localStorage.removeItem(storageKey);
          console.warn("Failed to parse cached data, fetching new data", url);
        }
      }

      setIsPending(true);
      try {
        const response = await fetch(url, {
          signal: abortControllerRef.current?.signal,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newData = (await response.json()) as T;
        setData(newData);

        const newCacheEntry: CacheEntry<T> = {
          data: newData,
          lastFetched: new Date().getTime(),
        };
        localStorage.setItem(storageKey, JSON.stringify(newCacheEntry));
        console.log("Fetched new data and updated cache", url);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.log("Fetch aborted", url);
          return;
        }
        if (currentRetry < MAX_RETRIES) {
          const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, currentRetry);
          console.log(`Fetch failed, retrying in ${retryDelay} ms...`, url);

          retryTimeoutRef.current = setTimeout(() => {
            fetchData(currentRetry + 1);
          }, retryDelay);
        } else {
          setIsError(true);
          setIsPending(false);
          console.error("Max retries reached. Failed to fetch data:", error);
          return;
        }
        console.error("Error fetching data:", error);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchData();
    return (): void => {
      abortControllerRef.current?.abort();

      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };
  }, [url, storageKey]);

  return { data, isPending, isError };
};

export default useCustomFetch;
