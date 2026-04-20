import { useQuery } from "@tanstack/react-query";

const useCustomFetch = <T>(url: string): ReturnType<typeof useQuery<T>> => {
  return useQuery<T>({
    queryKey: [url],
    queryFn: async ({ signal }) => {
      const response = await fetch(url, { signal });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json() as Promise<T>;
    },

    retry: 3,

    retryDelay: (attemptIndex) => {
      return Math.min(1000 * 2 ** attemptIndex, 30000);
    },

    staleTime: 5 * 60 * 1000,

    gcTime: 10 * 60 * 1000,
  });
};

export default useCustomFetch;
