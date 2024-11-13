import { createContext, useCallback, useMemo, useState } from "react"
import { useSearchQuery, useSearchTextContext } from "../lib/hooks";
import { JobItem, TPageDirection, TSortBy } from "../lib/types";
import { RESULTS_PER_PAGE } from "../lib/constants";

type JobItemsContext = {
    isLoading: boolean;
    currentPage: number;
    sortBy: TSortBy;
    totalNumberOfResults: number;
    totalNumberOfPages: number;
    jobItemsSortedAndSliced: JobItem[];
    handleChangePage: (direction: TPageDirection) => void;
    handleChangeSortBy: (option: TSortBy) => void;
}

export const JobItemsContext = createContext<JobItemsContext | null>(null)

export default function JobItemsContextProvider({ children }: {children: React.ReactNode}) {
    const { debouncedSearchText } = useSearchTextContext();

    const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState<TSortBy>("relevant");
  
    const totalNumberOfResults = jobItems?.length || 0;
    const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE
    const jobItemsSorted = useMemo(
        () => [...(jobItems || [])].sort((a, b) => {
            if (sortBy === 'relevant') return b.relevanceScore - a.relevanceScore;
            else return a.daysAgo - b.daysAgo;
        }), [jobItems, sortBy]
    )
    const jobItemsSortedAndSliced = useMemo(
        () => jobItemsSorted.slice((currentPage - 1) * RESULTS_PER_PAGE, currentPage * RESULTS_PER_PAGE),
        [jobItemsSorted, currentPage]
    );
  
    const handleChangePage = useCallback(() => {
        (direction: TPageDirection) => {
            if (direction === "next") {
                setCurrentPage((prev) => prev + 1)
            } else if (direction === "prev") {
                setCurrentPage((prev) => prev - 1)
            }
        }
    }, [])
  
    const handleChangeSortBy = useCallback(() => {
        (option: TSortBy) => {
            setSortBy(option)
            setCurrentPage(1)
        }
    }, [])

    const contextValue = useMemo(() => ({
        isLoading,
        currentPage,
        sortBy,
        totalNumberOfResults,
        totalNumberOfPages,
        jobItemsSortedAndSliced,
        handleChangePage,
        handleChangeSortBy
    }), [
        isLoading,
        currentPage,
        sortBy,
        totalNumberOfResults,
        totalNumberOfPages,
        jobItemsSortedAndSliced,
        handleChangePage,
        handleChangeSortBy
    ])

    return (
        <JobItemsContext.Provider
            value={contextValue}
        >
            {children}
        </JobItemsContext.Provider>
    )
}