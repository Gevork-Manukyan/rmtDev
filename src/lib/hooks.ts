import { useEffect, useState } from "react";
import { JobItem } from "./types";
import { BASE_API_URL } from "./constants";

export function useJobItems (searchText: string) {
    const [jobItems, setJobItems] = useState<JobItem[]>([])
    const [isLoading, setIsLoading] = useState(false);

    const jobItemsSliced = jobItems.slice(0, 7)

    useEffect(() => {
        const fetchData = async () => {
        setIsLoading(true);

        const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
        const data = await response.json();
        setJobItems(data.jobItems);

        setIsLoading(false);
        }
        
        if (!searchText) return;
        fetchData();

    }, [searchText])

    return [
        jobItemsSliced,
        isLoading
    ] as const
}

export function useActiveJobItemId () {
    const [activeJobItemId, setActiveJobItemId] = useState<number | null>(null);

    useEffect(() => {
      const handleHashChange = () => {
        const jobId = +window.location.hash.slice(1);
        setActiveJobItemId(jobId)
      }
  
      // For inital page load
      handleHashChange();
  
      window.addEventListener('hashchange', handleHashChange)
  
      return () => {
        window.removeEventListener('hashchange', handleHashChange);
      }
    }, [])

    return activeJobItemId;
}

export function useJobItem (id: number | null) {  
  const [jobItem, setJobItem] = useState(null);

  useEffect(() => {
    const fetchJobInfo = async () => {
      if (!id) return;
  
      const res = await fetch(`${BASE_API_URL}/${id}`);
      const data = await res.json();
      setJobItem(data.jobItem)
    }

    fetchJobInfo();
  }, [id])

  return jobItem;
}