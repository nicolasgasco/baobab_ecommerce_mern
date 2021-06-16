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
      id={`product${product.id}`}
      className="pb-10 px-0 md:px-4 md:w-1/2 lg:w-1/3 xl:w-1/4"
    >
      <div className="bg-white py-10 rounded-lg shadow-md">
        {showPictureOrLoader}
      </div>
      <div className="relative px-4 -mt-6">
        <div className="bg-yellow-200 p-5 rounded-lg shadow-xl">
          <div className="flex items-baseline">
            <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
              {departmentName}
            </span>
          </div>
          <h4 className="mt-1 text-xl leading-tight">
            {`${product.completeName.brand} ${product.completeName.productName}, ${product.completeName.shortDesc}, ${product.completeName.productDesc1}, ${product.completeName.productDesc2}, ${product.completeName.productDesc3}, ${product.completeName.color}`}
          </h4>
          <div className="mt-2 text-2xl">
            {product.pricingInfo.price.toString().substring(0, 2)}
            {"."}
            {
              <span className="text-xl">
                {product.pricingInfo.price.toString().substring(3, 5)}
              </span>
            }
            <sup className> €</sup>
          </div>
          <div className="mt-4">
            <span className="text-teal-600 text-md font-semibold">FROM:</span>
            <span className="text-sm text-gray-600">
              {` ${product.ecoInfo.originCountryCode}`}
            </span>
          </div>
          <div className="mt-1">
            <span className="text-teal-600 text-md font-semibold">
              MADE IN:
            </span>
            <span className="text-sm text-gray-600">
              {` ${product.ecoInfo.productionCountryCode}`}
            </span>
          </div>
          <div className="mt-4">
            <span className="text-teal-600 text-md font-semibold">SOCIAL:</span>
            <span className="text-sm text-gray-600">
              {` ${product.ecoInfo.socialMission}`}
            </span>
          </div>
          <div className="mt-1">
            <span className="text-teal-600 text-md font-semibold">
              ENVIRONMENT:
            </span>
            <span className="text-sm text-gray-600">
              {` ${product.ecoInfo.environmentMission}`}
            </span>
          </div>
          <button
            onClick={() => {
              handleAddToCart(product);
            }}
            value={product._id}
            className={`px-6 py-2 mt-4 transition ease-in duration-200 uppercase rounded-full hover:bg-green-500 hover:text-white ${pingAnimation} hover:bold border-2 border-green-900 focus:outline-none`}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
