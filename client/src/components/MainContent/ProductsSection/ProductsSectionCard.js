import React, { useEffect, useState } from "react";
import ProductCard from "../Results/ProductCard";

import useHttp from "../../../hooks/use-http";

const ProductsSectionCard = () => {
  const [products, setProducts] = useState(["", "", ""]);

  const { sendRequest: fetchLatestProducts } = useHttp();

  useEffect(() => {
    // Fetching latest three results
    const handleFetchedProducts = (result) => {
      if (result.resultsFound !== 3) {
        throw new Error("Found less than three results");
      }
      setProducts(result.results);
    };
    fetchLatestProducts(
      {
        url: "/api/products/?pageSize=3&pageNum=1&sortBy=creationDate&order=-1",
      },
      handleFetchedProducts
    );
  }, [fetchLatestProducts]);

  const showCards = products.map((product, index) => {
    if (index < 3) {
      return (
        <ProductCard
          short={true}
          classes={
            "w-full py-4 lg:py-0 lg:w-1/3 px-4 flex flex-col items-center"
          }
          product={product}
        />
      );
    }
    return null;
  });

  return (
    <div>
      <h2 className="-mt-4 mb-8 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl text-center">
        Our latest arrivals
      </h2>
      <div className="container flex items-start justify-center">
        <div className="w-full">
          <div className="flex flex-col md:flex-row mx-auto">{showCards}</div>
        </div>
      </div>
    </div>
  );
};
export default ProductsSectionCard;
