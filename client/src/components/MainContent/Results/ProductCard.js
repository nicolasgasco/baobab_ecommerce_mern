import React, { useContext, useEffect, useState } from "react";
import Spinner from "../../../assets/img/Spinner-5.gif";

import CartContext from "../../../store/cart-context";

const ProductCard = ({ product, picturesLoading }) => {
  const [departmentName, setDepartmentName] = useState("Loading...");

  const { addItemToCart } = useContext(CartContext);

  const [pingAnimation, setPingAnimation] = useState("");

  useEffect(() => {
    fetch("api/departments")
      .then((res) => res.json())
      .then((res) => {
        setDepartmentName(res.results[0].translations.en_us);
      })
      .catch((error) => {
        console.log("En error ocurred: " + error);
      });
  }, []);

  const handleAddToCart = (id) => {
    addItemToCart(id);
    setPingAnimation("animate-ping");
    let animationTimeout = setTimeout(() => setPingAnimation(""), 1000);

    return () => {
      clearTimeout(animationTimeout);
    };
  };

  let showPictureOrLoader = (
    <img
      src={product.pictures[0].url}
      alt={product.pictures[0].alt}
      className="w-full object-cover object-center"
    />
  );
  if (picturesLoading) {
    showPictureOrLoader = (
      <img
        src={Spinner}
        alt="Loading animation"
        className="w-1/3 mx-auto p-5 object-cover object-center"
      />
    );
  }

  return (
    <div
      id={`product-${product._id}`}
      className="pb-10 md:px-4 sm:w-1/2 xl:w-1/3 px-2"
    >
      <div className="h-full">
        <div className="bg-white py-10 rounded-lg shadow-md">
          {showPictureOrLoader}
        </div>
        <div className="relative px-4 -mt-6">
          <div className="bg-yellow-200 p-4 rounded-lg shadow-xl">
            <div className="flex items-baseline">
              <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                {departmentName}
              </span>
            </div>
            <h3 className="mt-2 text-xl leading-tight">
              {`${product.completeName.brand} ${product.completeName.productName}, ${product.completeName.shortDesc}, ${product.completeName.productDesc1}, ${product.completeName.productDesc2}, ${product.completeName.productDesc3}, ${product.completeName.color}`}
            </h3>
            <div className="mt-2 text-3xl">
              {Number.parseInt(product.pricingInfo.price)}
              {"."}
              {
                <span className="text-xl">
                  {((product.pricingInfo.price - Math.floor(product.pricingInfo.price)) * 100).toFixed(0)}
                </span>
              }
              <p className="inline text-2xl"> €</p>
            </div>
            <div className="mt-4">
              <span className="text-teal-600 text-md font-semibold">FROM:</span>
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
  );
};

export default ProductCard;
