import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useEffect, useState } from "react";

export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement && 
        !e.target.closest('.bookmarks-btn') && 
        !e.target.closest('.bookmarks-popover')
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])

  return (
    <section>
      <button className="bookmarks-btn" onClick={() => setIsOpen(prev => !prev)}>
        Bookmarks <TriangleDownIcon />
      </button>

      {isOpen && <BookmarksPopover />}
    </section>
  );
}
