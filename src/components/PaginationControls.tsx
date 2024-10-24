import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { TDirection } from "../lib/types";

type PaginationControlsProps = {
  currentPage: number;
  totalNumberOfPages: number;
  onClick: (direction: TDirection) => void;
}

export default function PaginationControls({ currentPage, totalNumberOfPages, onClick }: PaginationControlsProps) {
  return (
    <section className="pagination">
      {currentPage > 1 &&  <PaginationButton direction={'prev'} currentPage={currentPage} onClick={() => onClick('prev')} />}
      {currentPage < totalNumberOfPages && <PaginationButton direction={'next'} currentPage={currentPage} onClick={() => onClick('next')} />}
    </section>
  );
}

type PaginationButtonProps = {
  direction: "prev" | "next";
  currentPage: number;
  onClick: () => void;
}

function PaginationButton({ direction, currentPage, onClick }: PaginationButtonProps) {
  return (
    <button 
      className={`pagination__button pagination__button--${direction}`} 
      onClick={(e) => {
        onClick();
        e.currentTarget.blur();
      }}
    >
      {direction === 'prev' && (
        <>
          <ArrowLeftIcon /> 
          Page {currentPage - 1}
        </>
      )} 

      {direction === 'next' && (
        <>
          Page {currentPage + 1} 
          <ArrowRightIcon />
        </>
      )}
    </button>
  )
}