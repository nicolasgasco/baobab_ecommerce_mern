import React, { useContext, useEffect, useState } from "react";
import Spinner from "../../../assets/img/Spinner-5.gif";
import LoadingOverlay from "../../UI/LoadingOverlay";

import CartContext from "../../../store/cart-context";
import useHttp from "../../../hooks/use-http";

const ProductCard = ({ product, picturesLoading, classes, short }) => {
  const [departmentName, setDepartmentName] = useState("Loading...");

  const { addItemToCart } = useContext(CartContext);

  // Animation used for cart icon
  const [pingAnimation, setPingAnimation] = useState("");

  // Custom hook per HTTP requests
  const { isLoading, setIsLoading, sendRequest: fetchDepartments } = useHttp();

  // Fetch departments when rendering product card
  useEffect(() => {
    const modifyFetchedDepartments = (res) => {
      setDepartmentName(res.results[0].translations.en_us);
    };
    fetchDepartments({ url: "api/departments" }, modifyFetchedDepartments);
    // Works better without dependencies
  }, [fetchDepartments]);

  const handleAddToCart = (id) => {
    console.log("loading");
    setIsLoading(true);
    addItemToCart(id);
    setPingAnimation("animate-ping");
    setIsLoading(false);
    console.log("finished");
    setPingAnimation("");
  };

  let showPictureOrLoader = (
    <img
      src={product.pictures[0].url}
      alt={product.pictures[0].alt}
      className="w-full object-contain h-full object-center rounded-lg"
    />
  );
  if (picturesLoading) {
    showPictureOrLoader = (
      <img
        src={Spinner}
        alt="Loading animation"
        className="w-1/3 mx-auto p-5 object-cover object-center rounded-lg"
      />
    );
  }
  
  return (
    <>
      {isLoading && <LoadingOverlay />}
      <div
        key={`product-${product._id}`}
        className={`${
          classes ? classes : "pb-10 md:px-4 sm:w-1/2 xl:w-1/3 px-2"
        }
        `}
      >
        <div className="h-full">
          <div className="bg-white p-0 rounded-lg shadow-md">
            {showPictureOrLoader}
          </div>
          <div className="relative px-1 -mt-6">
            <div className="bg-yellow-200 p-4 rounded-lg shadow-xl">
              <div className="flex items-baseline">
                <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                  {departmentName}
                </span>
              </div>
              <h3 className="mt-2 text-xl font-semibold leading-tight mb-2">
                {`${product.completeName.brand} ${product.completeName.productName}, ${product.completeName.shortDesc}, ${product.completeName.productDesc1}, ${product.completeName.productDesc2}, ${product.completeName.productDesc3}, ${product.completeName.color}`}
              </h3>
              <div className="mt-2 text-3xl">
                {Number.parseInt(product.pricingInfo.price)}
                {"."}
                {
                  <span className="text-xl">
                    {(
                      (product.pricingInfo.price -
                        Math.floor(product.pricingInfo.price)) *
                      100
                    ).toFixed(0)}
                  </span>
                }
                <p className="inline text-2xl"> €</p>
              </div>
              {!short && (
                <>
                  <div className="mt-4">
                    <span className="text-teal-600 text-md font-semibold">
                      FROM:
                    </span>
                    <span className="text-sm text-gray-600">
                      {` ${product.ecoInfo.originCountryCode}`}
                    </span>
                  </div>
                  <div className="mt-1">
                    <span className="text-teal-600 text-md font-semibold uppercase">
                      Made in:
                    </span>
                    <span className="text-sm text-gray-600">
                      {` ${product.ecoInfo.productionCountryCode}`}
                    </span>
                  </div>
                  <div className="mt-4">
                    <span className="text-teal-600 text-md font-semibold uppercase">
                      Social:
                    </span>
                    <span className="text-sm text-gray-600">
                      {` ${product.ecoInfo.socialMission}`}
                    </span>
                  </div>
                  <div className="mt-1">
                    <span className="text-teal-600 text-md font-semibold uppercase">
                      Environment:
                    </span>
                    <span className="text-sm text-gray-600">
                      {` ${product.ecoInfo.environmentMission}`}
                    </span>
                  </div>
                </>
              )}

              <div className="w-full flex justify-center">
                <button
                  onClick={() => {
                    handleAddToCart(product);
                  }}
                  value={product._id}
                  className={`px-6 py-2 mt-4 transition ease-in duration-200 uppercase rounded-full hover:bg-green-500 hover:text-white ${pingAnimation} hover:bold border-2 border-green-900 focus:outline-none`}
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
