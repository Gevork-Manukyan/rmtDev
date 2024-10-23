import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type PaginationControlsProps = {
  currentPage: number;
  onClick: (direction: "next" | "prev") => void;
}

export default function PaginationControls({ currentPage, onClick }: PaginationControlsProps) {
  return (
    <section className="pagination">
      <button className="pagination__button" onClick={() => onClick('prev')}><ArrowLeftIcon /> Page {currentPage - 1}</button>
      <button className="pagination__button" onClick={() => onClick('next')}>Page {currentPage + 1} <ArrowRightIcon /></button>
    </section>
  );
}
