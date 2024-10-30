import { createContext, useContext } from "react"
import { useLocalStorage } from "../lib/hooks"

type BookmarksContext = {
    bookmarkedIds: number[];
    handleToggleBookmark: (id: number) => void;
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

    return (
        <BookmarksContext.Provider
            value={{
                bookmarkedIds,
                handleToggleBookmark
            }}
        >
            {children}
        </BookmarksContext.Provider>
    )
}