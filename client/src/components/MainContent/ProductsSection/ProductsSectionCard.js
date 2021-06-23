import React, { useEffect, useState } from "react";
import ProductCardSlideshow from "../Results/ProductCardSlideshow";

import useHttp from "../../../hooks/use-http";

const ProductsSectionCard = () => {
  const [products, setProducts] = useState(["", "", ""]);
  const [picturesLoading, setPicturesLoading] = useState(false);

  const { sendRequest: fetchLatestProducts } = useHttp();

  useEffect(() => {
    const handleError = (err) => {
      setPicturesLoading(false);
    };
    // Fetching latest three results
    const handleFetchedProducts = (result) => {
      if (result.resultsFound !== 3) {
        throw new Error("Found less than three results");
      }
      setProducts(result.results);
      setPicturesLoading(false);
    };
    setPicturesLoading(true);
    fetchLatestProducts(
      {
        url: "/api/products/?pageSize=3&pageNum=1&sortBy=creationDate&order=-1",
      },
      handleFetchedProducts,
      handleError
    );
  }, [fetchLatestProducts]);

  const showCards = products.map((product, index) => {
    if (index < 3) {
      return (
        product && (
          <ProductCardSlideshow
            picturesLoading={picturesLoading}
            key={`product-${index + 1}`}
            product={product}
            // Showing only 2 elements if three don't fit
            classes={index === 2 ? `hidden xl:flex` : ""}
          />
        )
      );
    }
    return null;
  });

  return (
    <div>
      <h2 className="-mt-4 mb-8 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl text-center">
        Our latest arrivals
      </h2>
      <div className="h-full flex flex-wrap justify-center items-stretch">
        {showCards}
      </div>
    </div>
  );
};
export default ProductsSectionCard;
