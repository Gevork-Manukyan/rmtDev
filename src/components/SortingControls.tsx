import { useJobItemsContext } from "../lib/hooks";
import { TSortBy } from "../lib/types";

export default function SortingControls() {
  const { sortBy, handleChangeSortBy } = useJobItemsContext();
  
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortingButton sortBy="relevant" isActive={sortBy === 'relevant'} onClick={handleChangeSortBy} />
      <SortingButton sortBy="recent" isActive={sortBy === 'recent'} onClick={handleChangeSortBy} />
    </section>
  );
}

type SortingButtonProps = {
  sortBy: TSortBy;
  isActive: boolean;
  onClick: (option: TSortBy) => void;
}

function SortingButton({ sortBy, isActive, onClick }: SortingButtonProps) {
  return (
    <button 
        className={`sorting__button sorting__button--${sortBy} ${isActive ? "sorting__button--active" : ""}`}
        onClick={() => onClick(sortBy)}
      >
        {sortBy}
      </button>
  )
}