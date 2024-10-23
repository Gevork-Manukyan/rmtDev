import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type PaginationControlsProps = {
  currentPage: number;
  onClick: (direction: "next" | "prev") => void;
}

export default function PaginationControls({ currentPage, onClick }: PaginationControlsProps) {
  return (
    <section className="pagination">
      {currentPage > 1 &&  <PaginationButton direction={'prev'} currentPage={currentPage} onClick={() => onClick('prev')} />}
      <PaginationButton direction={'next'} currentPage={currentPage} onClick={() => onClick('next')} />
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
    <button className={`pagination__button pagination__button--${direction}`} onClick={onClick}>
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