import {
  useEffect,
  useReducer,
  useState,
  useCallback,
  useContext,
} from "react";
import ResultsBox from "./Results/ResultsBox";
import StoreSearchbar from "./StoreSearchbar";
import HeroMain from "./HeroMain";
import AuthContent from "./Auth/AuthContent";

import AuthContext from "../../store/auth-context";

const defaultResultsState = {
  showResultsBox: false,
  contentLoading: false,
  picturesLoading: false,
  isEmpty: false,
  activePage: 1,
  paginationData: {},
  searchKeywords: "",
  resultsPerPage: 8,
  fetchedProducts: [],
  showAuth: false,
};

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
    case "SHOW_AUTH":
      return { ...state, showAuth: !state };
    default:
      return defaultResultsState;
  }
};

const MainContent = () => {
  const [resultsState, dispatchResults] = useReducer(
    resultsReducer,
    defaultResultsState
  );

  const { openAuth, handleOpenAuth } = useContext(AuthContext);
  const [showAuth, setShowAuth] = useState(false);

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
      // Closing login when fetching new products
      handleOpenAuth();

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

  useEffect(() => {
    setShowAuth(openAuth);
  }, [openAuth]);

  let resultsContent = <HeroMain />;
  if (resultsState.showResultsBox) {
    resultsContent = (
      <ResultsBox
        fetchedProducts={resultsState.fetchedProducts}
        paginationData={resultsState.paginationData}
        handlePageChange={handlePageChange}
        handleResultsPerPage={handleResultsPerPage}
        contentLoading={resultsState.contentLoading}
        picturesLoading={resultsState.picturesLoading}
        isEmpty={resultsState.isEmpty}
      />
    );
  }

  return (
    <>
      <StoreSearchbar
        onGetSearchbarInput={getSearchbarInput}
        handleActivePage={handleActivePage}
        activePage={resultsState.activePage}
      />
      {openAuth ? <AuthContent /> : resultsContent}
    </>
  );
};

export default MainContent;
