import { useEffect, useState } from "react";
import ResultsBox from "./ResultsBox";
import StoreSearchbar from "./StoreSearchbar";
import HeroMain from "../UI/HeroMain";

const MainContent = () => {
  // Showing either result box or other content
  const [showResultsBox, setShowResultsBox] = useState(false);
  const [fetchedProducts, setFecthedProducts] = useState([]);

  const [paginationData, setPaginationData] = useState({});
  const [activePage, setActivePage] = useState(1);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [resultsPerPage, setResultsPerPage] = useState(8);

  // State for when content is loading and not showing
  const [contentLoading, setContentLoading] = useState(false);
  // Used for when pictures are still loading
  const [picturesLoading, setPicturesLoading] = useState(false);
  // Used to show message when there are no results to show
  const [isEmpty, setIsEmpty] = useState(false);

  // Fetching the products by keywords
  const getSearchbarInput = (input) => {
    setShowResultsBox(true);
    setContentLoading(true);
    setPicturesLoading(true);
    setIsEmpty(false);
    // THis is necessary, otherwise some products just stay stuck there
    setFecthedProducts([]);
    setSearchKeywords(input)

    console.log("Fetching products...");
    fetch(`api/products/search/?pageNum=${activePage}&pageSize=${resultsPerPage}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keywords: (input || searchKeywords) }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.results.length === 0) {
          setIsEmpty(true);
          setPicturesLoading(false);
          setContentLoading(false);
        } else {
          setFecthedProducts(res.results);
          console.log(res.pageNumber);
          setPaginationData({
            productsFound: res.productsFound,
            pageNumber: res.pageNumber,
            pageSize: res.pageSize,
            totalProducts: res.totalProducts,
            totalPages: res.totalPages,
          });
          setPicturesLoading(false);
          setContentLoading(false);
          setIsEmpty(false);
        }
      })
      .catch((error) => {
        setIsEmpty(true);
        setPicturesLoading(false);
        setContentLoading(false);
        console.log("An error ocurred:" + error.message);
      });
  };

  const handlePageChange = (event) => {
    setActivePage(event.target.value);
  };

  function handleResultsPerPage(value) {
    setResultsPerPage(value);
    getSearchbarInput();
  }

  return (
    <>
      <StoreSearchbar
        onGetSearchbarInput={getSearchbarInput}
        setActivePage={setActivePage}
        activePage={activePage}
      />
      {showResultsBox ? (
        <ResultsBox
          fetchedProducts={fetchedProducts}
          paginationData={paginationData}
          handlePageChange={handlePageChange}
          handleResultsPerPage={handleResultsPerPage}
          contentLoading={contentLoading}
          picturesLoading={picturesLoading}
          isEmpty={isEmpty}
        />
      ) : (
        <HeroMain />
      )}
    </>
  );
};

export default MainContent;
