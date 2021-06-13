import React, { useEffect } from "react";
import NothingFound from "./NothingFound";
import PageCounter from "./PageCounter";
import ProductCard from "./ProductCard1";
import SectionLoading from "../SectionLoading";
import SimpleDropdown from "../../UI/SimpleDropdown";

const ResultsBox = ({
  fetchedProducts,
  picturesLoading,
  isEmpty,
  contentLoading,
  handleResultsPerPage,
  paginationData,
  handlePageChange,
}) => {
  const showProducts = fetchedProducts.map((product) => {
    return (
      <ProductCard
        key={`product-${product._id}`}
        product={product}
        picturesLoading={picturesLoading}
      />
    );
  });

  const resultsPerPageDropdown = ["4", "8", "24", "60"];

  return (
    <section className="p-5 my-10 bg-transparent">
      <div className="bg-white mx-auto mw-11/12 md:w-10/12 m-6 p-6 rounded-lg shadow-lg">
        {isEmpty ? (
          <NothingFound />
        ) : contentLoading ? (
          <SectionLoading className="w-8/12" />
        ) : (
          <>
            <div className="bg-black flex-wrap justify-end"></div>
            <div className="flex flex-wrap justify-center">{showProducts}</div>
            <div className="flex-column justify-center">
              <PageCounter
                paginationData={paginationData}
                className="flex-row justify-center mx-auto w-min md:absolute md:m-auto md:left-0 md:right-0"
                handlePageChange={handlePageChange}
              />
              <SimpleDropdown
                heading="Results per page"
                className="md:w-min md:ml-auto"
                fields={resultsPerPageDropdown}
                handleResultsPerPage={handleResultsPerPage}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ResultsBox;
