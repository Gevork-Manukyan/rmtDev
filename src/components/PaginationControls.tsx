import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { TPageDirection } from "../lib/types";
import { useJobItemsContext } from "../lib/hooks";

export default function PaginationControls() {
  const { currentPage, totalNumberOfPages, handleChangePage } = useJobItemsContext();
  
  return (
    <section className="pagination">
      {currentPage > 1 &&  <PaginationButton direction={'prev'} currentPage={currentPage} onClick={() => handleChangePage('prev')} />}
      {currentPage < totalNumberOfPages && <PaginationButton direction={'next'} currentPage={currentPage} onClick={() => handleChangePage('next')} />}
    </section>
  );
}

type PaginationButtonProps = {
  direction: TPageDirection;
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