import { useEffect, useReducer, useCallback } from "react";
import ResultsBox from "./ResultsBox";
import StoreSearchbar from "./StoreSearchbar";
import HeroMain from "./HeroMain";

const resultsReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_RESULTS":
      return { ...state, showResultsBox: action.val };
    case "CONTENT_LOADING":
      return { ...state, contentLoading: action.val };
    case "PICTURES_LOADING":
      return { ...state, picturesLoading: action.val };
    case "IS_EMPTY":
      return { ...state, isEmpty: action.val };
    case "ACTIVE_PAGE":
      return { ...state, activePage: action.val };
    case "PAGINATION_DATA":
      return { ...state, paginationData: action.val };
    case "SEARCH_KEYWORDS":
      return { ...state, searchKeywords: action.val };
    case "RESULTS_PAGE":
      return { ...state, resultsPerPage: action.val };
    case "FETCHED_PRODUCTS":
      return { ...state, fetchedProducts: action.val };

    default:
      break;
  }
  return {
    showResultsBox: false,
    contentLoading: false,
    picturesLoading: false,
    isEmpty: false,
    activePage: 1,
    paginationData: {},
    searchKeywords: "",
    resultsPerPage: 8,
    fetchedProducts: [],
  };
};

const MainContent = () => {
  // Showing either result box or other content
  // const [showResultsBox, setShowResultsBox] = useState(false);
  // const [fetchedProducts, setFecthedProducts] = useState([]);

  // const [paginationData, setPaginationData] = useState({});
  // const [activePage, setActivePage] = useState(1);
  // const [searchKeywords, setSearchKeywords] = useState("");
  // const [resultsPerPage, setResultsPerPage] = useState(8);

  // State for when content is loading and not showing
  // const [contentLoading, setContentLoading] = useState(false);
  // Used for when pictures are still loading
  // const [picturesLoading, setPicturesLoading] = useState(false);
  // Used to show message when there are no results to show
  // const [isEmpty, setIsEmpty] = useState(false);

  const [resultsState, dispatchResults] = useReducer(resultsReducer, {
    showResultsBox: false,
    contentLoading: false,
    picturesLoading: false,
    isEmpty: false,
    activePage: 1,
    paginationData: {},
    searchKeywords: "",
    resultsPerPage: 8,
    fetchedProducts: [],
  });

  // Fetching the products by keywords
  const getSearchbarInput = useCallback(
    (input) => {
      dispatchResults({ type: "SHOW_RESULTS", val: true });
      dispatchResults({ type: "CONTENT_LOADING", val: true });
      dispatchResults({ type: "PICTURES_LOADING", val: true });
      dispatchResults({ type: "IS_EMPTY", val: false });
      // THis is necessary, otherwise some products just stay stuck there
      dispatchResults({ type: "FETCHED_PRODUCTS", val: [] });
      dispatchResults({ type: "SEARCH_KEYWORDS", val: input });

      console.log("Fetching products...");

      fetch(
        `api/products/search/?pageNum=${resultsState.activePage.toString()}&pageSize=${resultsState.resultsPerPage.toString()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            keywords: input,
            // keywords: input || resultsState.searchKeywords,
          }),
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.results.length === 0) {
            dispatchResults({ type: "IS_EMPTY", val: true });
            dispatchResults({ type: "PICTURES_LOADING", val: false });
            dispatchResults({ type: "CONTENT_LOADING", val: false });
          } else {
            dispatchResults({ type: "FETCHED_PRODUCTS", val: res.results });
            dispatchResults({
              type: "PAGINATION_DATA",
              val: {
                productsFound: res.productsFound,
                pageNumber: res.pageNumber,
                pageSize: res.pageSize,
                totalProducts: res.totalProducts,
                totalPages: res.totalPages,
              },
            });
            dispatchResults({ type: "PICTURES_LOADING", val: false });
            dispatchResults({ type: "CONTENT_LOADING", val: false });
            dispatchResults({ type: "IS_EMPTY", val: false });
          }
        })
        .catch((error) => {
          dispatchResults({ type: "IS_EMPTY", val: true });
          dispatchResults({ type: "PICTURES_LOADING", val: false });
          dispatchResults({ type: "CONTENT_LOADING", val: false });
          console.log("An error ocurred:" + error.message);
        });
    },
    [resultsState.activePage, resultsState.resultsPerPage]
  );

  const handleActivePage = useCallback(
    (data) => {
      dispatchResults({ type: "ACTIVE_PAGE", val: data });
    },
    [dispatchResults]
  );

  const handlePageChange = useCallback(
    (event) => {
      handleActivePage(event.target.value);
    },
    [handleActivePage]
  );

  const handleResultsPerPage = useCallback(
    (value) => {
      if (resultsState.activePage !== 1) {
        dispatchResults({ type: "ACTIVE_PAGE", val: 1 });
      }
      dispatchResults({ type: "RESULTS_PAGE", val: value });
    },
    [resultsState.activePage]
  );

  useEffect(() => {
    if (resultsState.searchKeywords !== "") {
      getSearchbarInput(resultsState.searchKeywords);
    }
  }, [
    resultsState.resultsPerPage,
    resultsState.searchKeywords,
    resultsState.activePage,
    getSearchbarInput,
  ]);

  return (
    <>
      <StoreSearchbar
        onGetSearchbarInput={getSearchbarInput}
        handleActivePage={handleActivePage}
        activePage={resultsState.activePage}
      />
      {resultsState.showResultsBox ? (
        <ResultsBox
          fetchedProducts={resultsState.fetchedProducts}
          paginationData={resultsState.paginationData}
          handlePageChange={handlePageChange}
          handleResultsPerPage={handleResultsPerPage}
          contentLoading={resultsState.contentLoading}
          picturesLoading={resultsState.picturesLoading}
          isEmpty={resultsState.isEmpty}
        />
      ) : (
        <HeroMain />
      )}
    </>
  );
};

export default MainContent;
