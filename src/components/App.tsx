import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import { HeaderTop } from "./Header";
import Header from "./Header";
import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import JobItemContent from "./JobItemContent";
import Sidebar from "./Sidebar";
import { SidebarTop } from "./Sidebar";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import { useDebounce, useSearchQuery } from "../lib/hooks";
import { Toaster } from "react-hot-toast";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { TPageDirection, TSortBy } from "../lib/types";

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 250);
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<TSortBy>("relevant");

  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE
  const jobItemsSorted = [...(jobItems || [])].sort((a, b) => {
    if (sortBy === 'relevant') return b.relevanceScore - a.relevanceScore;
    else return a.daysAgo - b.daysAgo;
  })
  const jobItemsSortedAndSliced = jobItemsSorted.slice((currentPage - 1) * RESULTS_PER_PAGE, currentPage * RESULTS_PER_PAGE);

  const handleChangePage = (direction: TPageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1)
    } else if (direction === "prev") {
      setCurrentPage((prev) => prev - 1)
    }
  }

  const handleChangeSortBy = (option: TSortBy) => {
    console.log(option)
    setSortBy(option)
    setCurrentPage(1 )
  }

  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>

        <SearchForm
          searchText={searchText}
          setSearchText={setSearchText}
        />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalNumberOfResults={totalNumberOfResults} />
            <SortingControls sortBy={sortBy} onClick={handleChangeSortBy} />
          </SidebarTop>

          <JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />
          <PaginationControls currentPage={currentPage} totalNumberOfPages={totalNumberOfPages} onClick={handleChangePage} />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />

      <Toaster position="top-right" />
    </>
  );
}

export default App;
