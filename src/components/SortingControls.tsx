import { TSortBy } from "../lib/types";

type SortingControlsProps = {
  sortBy: TSortBy;
  onClick: (option: TSortBy) => void;
}

export default function SortingControls({ sortBy, onClick }: SortingControlsProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortingButton sortBy="relevant" isActive={sortBy === 'relevant'} onClick={onClick} />
      <SortingButton sortBy="recent" isActive={sortBy === 'recent'} onClick={onClick} />
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