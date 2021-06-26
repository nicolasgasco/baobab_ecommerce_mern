import React, {
  useEffect,
  useReducer,
  useCallback,
  useContext,
  Suspense,
} from "react";
import { useHistory, useLocation } from "react-router-dom";

// Components
import StoreSearchbar from "./StoreSearchbar";
import HeroMain from "./LandingPage/HeroMain";
import BoxWrapper from "../UI/BoxWrapper";
import ProductsSectionCard from "./LandingPage/ProductsSectionCard";
import LoadingOverlay from "../UI/LoadingOverlay";
import ResultsBox from "../../pages/ResultsBox";

// Auth context for authentication
import AuthContext from "../../store/auth-context";

// Custom hook for querying APIK
import useHttp from "../../hooks/use-http";

const ProfilePage = React.lazy(() => import("../../pages/ProfilePage"));
const PasswordChange = React.lazy(() => import("../../pages/PasswordChange"));
const ShoppingCart = React.lazy(() => import("../../pages/ShoppingCart"));
const CheckoutForm = React.lazy(() => import("../../pages/CheckoutForm"));
const OrderSent = React.lazy(() => import("../../pages/OrderSent"));
const Orders = React.lazy(() => import("../../pages/Orders"));
const SignupForm = React.lazy(() => import("../../pages/SignupForm"));
const Loginform = React.lazy(() => import("../../pages/LoginForm"));

const defaultResultsState = {
  showResultsBox: false,
  contentLoading: false,
  picturesLoading: false,
  isEmpty: false,
  activePage: 1,
  paginationData: {},
  searchKeywords: "",
  resultsPerPage: 6,
  fetchedProducts: [],
  showAuth: false,
  departmentFilter: { name: "all" },
  sortingFilter: "",
};

const resultsReducer = (state, action) => {
  switch (action.type) {
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
    case "DEPARTMENT_FILTER":
      return { ...state, departmentFilter: action.val };
    case "SORTING_FILTER":
      return { ...state, sortingFilter: action.val };
    default:
      return defaultResultsState;
  }
};

const MainContent = () => {
  // Reducer for handling form
  const [resultsState, dispatchResults] = useReducer(
    resultsReducer,
    defaultResultsState
  );

  const { checkLogin } = useContext(AuthContext);

  const history = useHistory();

  const { sendRequest: fetchProducts } = useHttp();

  // Fetching the products by keywords
  const getSearchbarInput = useCallback(
    (input = null) => {
      // Redirect to search to render searchbox
      history.push("/search");
      // dispatchResults({ type: "SHOW_RESULTS", val: true });
      dispatchResults({ type: "CONTENT_LOADING", val: true });
      dispatchResults({ type: "PICTURES_LOADING", val: true });
      dispatchResults({ type: "IS_EMPTY", val: false });
      // THis is necessary, otherwise some products just stay stuck there
      dispatchResults({ type: "FETCHED_PRODUCTS", val: [] });
      dispatchResults({ type: "SEARCH_KEYWORDS", val: input });

      // Function with logic for when products are fetched
      const handleFetchedProducts = (res) => {
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
          setTimeout(() => {
            dispatchResults({ type: "CONTENT_LOADING", val: false });
          }, 1000);
          dispatchResults({ type: "IS_EMPTY", val: false });
        }
      };

      // Function with logic for when an error occurs
      const handleError = () => {
        dispatchResults({ type: "IS_EMPTY", val: true });
        dispatchResults({ type: "PICTURES_LOADING", val: false });
        dispatchResults({ type: "CONTENT_LOADING", val: false });
      };

      fetchProducts(
        {
          url: `api/products/search/?pageNum=${resultsState.activePage.toString()}&pageSize=${resultsState.resultsPerPage.toString()}${
            resultsState.departmentFilter.name !== "all"
              ? `&department=${resultsState.departmentFilter._id || ""}`
              : ""
          }${
            resultsState.sortingFilter
              ? `&sortBy=${resultsState.sortingFilter}`
              : ""
          }`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            keywords: input,
          },
        },
        handleFetchedProducts,
        handleError
      );
    },
    [
      resultsState.activePage,
      resultsState.resultsPerPage,
      history,
      fetchProducts,
      resultsState.departmentFilter,
      resultsState.sortingFilter,
    ]
  );

  const handleActivePage = useCallback(
    (data) => {
      dispatchResults({ type: "ACTIVE_PAGE", val: +data });
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

  const handleDepartmentFilter = useCallback((value) => {
    if (value.name) {
      dispatchResults({ type: "DEPARTMENT_FILTER", val: value });
    }
  }, []);

  const handleSortingFilter = useCallback((value) => {
    dispatchResults({ type: "SORTING_FILTER", val: value });
  }, []);

  useEffect(() => {
    if (resultsState.searchKeywords !== "") {
      getSearchbarInput(resultsState.searchKeywords);
    }
  }, [
    resultsState.resultsPerPage,
    resultsState.searchKeywords,
    resultsState.activePage,
    resultsState.sortingFilter,
    getSearchbarInput,
  ]);

  // Redirecting if there are no results on load (e.g. when manually realoding)
  useEffect(() => {
    if (resultsState.fetchedProducts.length === 0) {
      history.push("/");
    }
    // This only works without dependencies
  }, []);

  // Check if user is still logged in
  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  // Used for route protection
  const redirectIfNotLoggedIn = () => {
    if (!localStorage.getItem("token")) {
      history.push("/");
      history.go(0);
    }
  };

  // Conditional rendering
  // Squared brackets because I'm using map later
  const location = useLocation();
  let resultsContent;

  switch (location.pathname) {
    case "/":
      resultsContent = [<HeroMain />, <ProductsSectionCard />];
      break;
    case "/search":
      resultsContent = [
        <ResultsBox
          fetchedProducts={resultsState.fetchedProducts}
          paginationData={resultsState.paginationData}
          handlePageChange={handlePageChange}
          handleResultsPerPage={handleResultsPerPage}
          contentLoading={resultsState.contentLoading}
          picturesLoading={resultsState.picturesLoading}
          isEmpty={resultsState.isEmpty}
          handleSortingFilter={handleSortingFilter}
        />,
      ];
      break;
    case "/signin":
      resultsContent = [<Loginform />];
      break;
    case "/signup":
      resultsContent = [<SignupForm />];
      break;
    case "/profile":
      redirectIfNotLoggedIn();
      resultsContent = [<ProfilePage />];
      break;
    case "/password":
      redirectIfNotLoggedIn();
      resultsContent = [<PasswordChange />];
      break;
    case "/cart":
      resultsContent = [<ShoppingCart />];
      break;
    case "/checkout":
      redirectIfNotLoggedIn();
      resultsContent = [<CheckoutForm />];
      break;
    case "/success":
      redirectIfNotLoggedIn();
      resultsContent = [<OrderSent />];
      break;
    case "/orders":
      redirectIfNotLoggedIn();
      resultsContent = [<Orders />];
      break;
    default:
      resultsContent = [<HeroMain />, <ProductsSectionCard />];
      break;
  }

  return (
    <>
      <StoreSearchbar
        handleDepartmentFilter={handleDepartmentFilter}
        handleSortingFilter={handleSortingFilter}
        departmentFilter={resultsState.departmentFilter}
        onGetSearchbarInput={getSearchbarInput}
        handleActivePage={handleActivePage}
        activePage={resultsState.activePage}
      />
      <Suspense fallback={<LoadingOverlay />}>
        {resultsContent.map((component, index) => {
          return (
            <BoxWrapper key={`component-${index}`}>{component}</BoxWrapper>
          );
        })}
      </Suspense>
    </>
  );
};

export default MainContent;
