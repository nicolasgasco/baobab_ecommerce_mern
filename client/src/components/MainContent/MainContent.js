import { useEffect, useState } from "react";
import ResultsBox from "./ResultsBox";
import StoreSearchbar from "./StoreSearchbar";

const MainContent = () => {
  const [fetchedProducts, setFecthedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);

  const getSearchbarInput = (input) => {
    fetch("api/products/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keywords: input }),
    })
      .then((res) => res.json())
      .then((res) => {
        setFecthedProducts(res.results);
        setIsLoading(false);
        res.results.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
      })
      .catch((error) => {
        console.log("An error ocurred:" + error.message);
      });
  };

  return (
    <>
      <StoreSearchbar onGetSearchbarInput={getSearchbarInput} />
      <ResultsBox
        fetchedProducts={fetchedProducts}
        isLoading={isLoading}
        isEmpty={isEmpty}
      />
    </>
  );
};

export default MainContent;
