import NothingFound from "../UI/NothingFound";
import PageCounter from "../UI/PageCounter";
import ProductCard from "../UI/ProductCard1";
import SectionLoading from "../UI/SectionLoading";
import SimpleDropdown from "../UI/SimpleDropdown";

const ResultsBox = (props) => {
  const showProducts = props.fetchedProducts.map((product) => {
    return (
      <ProductCard
        key={`product-${product._id}`}
        product={product}
        picturesLoading={props.picturesLoading}
      />
    );
  });

  const resultsPerPageDropdown = ["4", "8", "24", "60"];

  return (
    <section className="p-5 my-10 bg-gray-200">
      <div className="bg-white mx-auto mw-11/12 md:w-10/12 m-6 p-6 rounded-lg shadow-lg">
        {props.isEmpty ? (
          <NothingFound />
        ) : props.contentLoading ? (
          <SectionLoading className="w-8/12" />
        ) : (
          <>
            <div className="bg-black flex-wrap justify-end">
              <SimpleDropdown
                heading="Results per page"
                fields={resultsPerPageDropdown}
              />
            </div>
            <div className="flex flex-wrap justify-center">{showProducts}</div>
            <PageCounter
              paginationData={props.paginationData}
              className="flex justify-center"
              handlePageChange={props.handlePageChange}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default ResultsBox;
