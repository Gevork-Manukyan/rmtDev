import { createContext } from "react"
import { useLocalStorage } from "../lib/hooks"

export const BookmarksContext = createContext(null)

export default function BookmarksContextProvider({ children }) {
    const [bookmarkedIds, setBookmarkIds] = useLocalStorage('bookmarkedIds')

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