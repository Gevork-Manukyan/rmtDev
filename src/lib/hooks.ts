import { useEffect, useState } from "react";
import { JobItem } from "./types";

export function useJobItems (searchText: string) {
    const [jobItems, setJobItems] = useState<JobItem[]>([])
    const [isLoading, setIsLoading] = useState(false);

    const jobItemsSliced = jobItems.slice(0, 7)

    useEffect(() => {
        const fetchData = async () => {
        setIsLoading(true);

        const response = await fetch(`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`);
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