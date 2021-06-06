import { useEffect, useState } from "react";
import ResultsBox from "./ResultsBox";
import StoreSearchbar from "./StoreSearchbar";
import HeroMain from "../UI/HeroMain";

const MainContent = () => {
  // Showing either result box or other content
  const [showResultsBox, setShowResultsBox] = useState(false);
  const [fetchedProducts, setFecthedProducts] = useState([]);
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

    console.log("Fetching products...");

    fetch("api/products/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keywords: input }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.results.length);
        if (res.results.length === 0) {
          setIsEmpty(true);
          setPicturesLoading(false);
          setContentLoading(false);
        } else {
          setFecthedProducts(res.results);
          setPicturesLoading(false);
          setContentLoading(false);
          setIsEmpty(false);
        }
      })
      .catch((error) => {
        console.log("An error ocurred:" + error.message);
      });
  };

  return (
    <>
      <StoreSearchbar onGetSearchbarInput={getSearchbarInput} />
      {showResultsBox ? (
        <ResultsBox
          fetchedProducts={fetchedProducts}
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
