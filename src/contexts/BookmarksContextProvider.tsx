import { createContext } from "react"
import { useLocalStorage, useJobItems } from "../lib/hooks"
import { JobItem } from "../lib/types";

type BookmarksContext = {
    bookmarkedIds: number[];
    handleToggleBookmark: (id: number) => void;
    bookmarkedJobItems: JobItem[];
    isLoading: boolean;
}

export const BookmarksContext = createContext<BookmarksContext | null>(null)

export default function BookmarksContextProvider({ children }: {children: React.ReactNode}) {
    const [bookmarkedIds, setBookmarkIds] = useLocalStorage<number[]>('bookmarkedIds', [])

    const handleToggleBookmark = (id: number) => {
        if (bookmarkedIds.includes(id)) {
        setBookmarkIds(prev => prev.filter(item => item !== id))
        } else {
        setBookmarkIds(prev => [...prev, id])
        }
    }

    const { jobItems, isLoading } = useJobItems(bookmarkedIds)
    const bookmarkedJobItems = jobItems ? jobItems : []

    return (
        <BookmarksContext.Provider
            value={{
                bookmarkedIds,
                handleToggleBookmark,
                bookmarkedJobItems,
                isLoading
            }}
        >
            {children}
        </BookmarksContext.Provider>
    )
}