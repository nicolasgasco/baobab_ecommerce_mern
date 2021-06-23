import React from "react";
import NothingFound from "./NothingFound";
import PageCounter from "./PageCounter";
import SimpleDropdown from "../../UI/SimpleDropdown";
import LoadingOverlay from "../../UI/LoadingOverlay";
import ProductCardSlideshow from "./ProductCardSlideshow";
import SectionedDropdown from "../../UI/SectionedDropdown";

const ResultsBox = ({
  fetchedProducts,
  picturesLoading,
  isEmpty,
  contentLoading,
  handleResultsPerPage,
  paginationData,
  handlePageChange,
  handleSortingFilter,
}) => {
  const showProducts = fetchedProducts.map((product) => {
    return (
      <ProductCardSlideshow
        key={`product-${product._id}`}
        product={product}
        picturesLoading={picturesLoading}
      />
    );
  });

  const resultsPerPageDropdown = ["3", "6", "24", "60"];
  return (
    <>
      {isEmpty ? (
        <NothingFound />
      ) : (
        <>
          {contentLoading && <LoadingOverlay />}
          <div className="flex justify-end align-center items-baseline mr-4 mb-4">
            <span className="sr-only">Sort by:</span>
            <SectionedDropdown handleSortingFilter={handleSortingFilter} />
          </div>
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
    </>
  );
};

export default ResultsBox;
