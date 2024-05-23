import { useEffect, useState } from "react";
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


function App() {
  const [jobItems, setJobItems] = useState([])
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const response = await fetch(`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`);
      const data = await response.json();
      setJobItems(data.jobItems);

      setIsLoading(false);
    }
    
    if (!searchText) return;
    fetchData();

  }, [searchText])

  return <>
    <Background />
    <Header>
      <HeaderTop>
        <Logo />
        <BookmarksButton />
      </HeaderTop>

      <SearchForm searchText={searchText} setSearchText={setSearchText} />
    </Header>
    <Container>
      <Sidebar>
        <SidebarTop>
          <ResultsCount />
          <SortingControls />
        </SidebarTop>

        <JobList jobItems={jobItems} isLoading={isLoading} />
        <PaginationControls />
      </Sidebar>
      <JobItemContent />
    </Container>
    <Footer />
  </>;
}

export default App;
