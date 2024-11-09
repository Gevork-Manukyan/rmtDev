import { useContext, useEffect, useState } from "react";
import { DetailedJobItem, JobItem } from "./types";
import { BASE_API_URL } from "./constants";
import { useQueries, useQuery } from "@tanstack/react-query";
import { handleError } from "./utils";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";
import { ActiveIdContext } from "../contexts/ActiveIdContextProvider";

type JobItemApiResponse = {
  public: boolean;
  jobItem: DetailedJobItem;
};

const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }

  const data = await response.json();
  return data;
};

export function useJobItem(id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: handleError,
    }
  );

  return { jobItem: data?.jobItem, isLoading: isInitialLoading } as const;
}

export function useJobItems(idArray: number[]) {
  const results = useQueries({
    queries: idArray.map(id => ({
      queryKey: ['job-item', id],
      queryFn: () => fetchJobItem(id),
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: handleError,
    }))
  })

  const jobItems = results
    .map(result => result.data?.jobItem)
    .filter(jobItem => jobItem !== undefined) as DetailedJobItem[];

  const isLoading = results.some(result => result.isLoading)

  return { jobItems, isLoading };
}

type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};

const searchJobItems = async (
  searchText: string
): Promise<JobItemsApiResponse> => {
  const response = await fetch(`${BASE_API_URL}?search=${searchText}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }

  const data = await response.json();
  return data;
};

export function useSearchQuery(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => searchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(searchText),
      onError: handleError,
    }
  );

  return {
    jobItems: data?.jobItems,
    isLoading: isInitialLoading,
  } as const;
}
// const [jobItems, setJobItems] = useState<JobItem[]>([]);
// const [isLoading, setIsLoading] = useState(false);

// useEffect(() => {
//   const fetchData = async () => {
//     setIsLoading(true);

//     const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
//     const data = await response.json();
//     setJobItems(data.jobItems);

//     setIsLoading(false);
//   };

//   if (!searchText) return;
//   fetchData();
// }, [searchText]);

// return {
//   jobItems,
//   isLoading,
// } as const;

// -------------------------------------------------------------------------------------

export function useActiveJobItemId() {
  const [activeJobItemId, setActiveJobItemId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const jobId = +window.location.hash.slice(1);
      setActiveJobItemId(jobId);
    };

    // For inital page load
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeJobItemId;
}

export function useDebounce<T>(value: T, delay = 1000) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebounceValue(value), delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debounceValue;
}

export function useLocalStorage<T>(key: string, initalValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() => 
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initalValue))
  )

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [
    value,
    setValue
  ] as const;
}

export function useOnClickOutside(refArray: React.RefObject<HTMLElement>[], callback: () => void) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (refArray.every((ref) => !ref.current?.contains(e.target as Node))) {
        callback()
      }
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [refArray, callback])
}

// -------------------------------------------------------------------------------------

export function useBookmarksContext() {
  const context = useContext(BookmarksContext)
  if (!context) {
    throw new Error(
      "useBookmarksContext must be used within a BookmarksContextProvider"
    )
  }

  return context;
}

export function useActiveIdContext() {
  const context = useContext(ActiveIdContext)
  if (!context) {
    throw new Error(
      "useActiveIdContext must be used within a ActiveIdContextProvider"
    )
  }

  return context;
}