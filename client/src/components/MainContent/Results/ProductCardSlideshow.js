import React, { useContext, useEffect, useState } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { ShoppingCartIcon } from "@heroicons/react/outline";

import Spinner from "../../../assets/img/Spinner-5.gif";
import LoadingOverlay from "../../UI/LoadingOverlay";

import CartContext from "../../../store/cart-context";
import useHttp from "../../../hooks/use-http";

const ProductCardSlideshow = ({ product, picturesLoading, classes }) => {
  const { addItemToCart } = useContext(CartContext);
  const [starRating, setStarRating] = useState(0);

  // Get product rating
  useEffect(() => {
    if (product.starRating) {
      setStarRating(product.starRating);
    }
  }, [product.starRating]);

  // Custom hook per HTTP requests
  const { isLoading, setIsLoading } = useHttp();

  const handleAddToCart = (id) => {
    console.log(id);
    console.log("loading");
    setIsLoading(true);
    addItemToCart(id);
    setIsLoading(false);
    console.log("finished");
  };

  let showPictures;
  if (product) {
    showPictures = product.pictures.map((picture, index) => {
      if (picturesLoading) {
        return (
          <img
            src={Spinner}
            alt="Loading animation"
            className="w-1/3 mx-auto p-5 object-cover object-center rounded-lg z-0"
          />
        );
      } else {
        return (
          <Slide className="flex items-center justify-center" index={index + 1}>
            <img
              src={picture.url}
              alt={picture.alt}
              className="h-52 object-contain object-center z-0"
            />
          </Slide>
        );
      }
    });
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
        <div className="shadow-lg rounded-3xl z-0">
          <div
            className="flex items-center rounded-t-3xl justify-between bg-white px-2
           py-4"
          >
            <CarouselProvider
              naturalSlideWidth={50}
              naturalSlideHeight={125}
              totalSlides={product ? product.pictures.length : 0}
              isIntrinsicHeight={true}
              infinite={true}
              className="flex items-center justify-between w-full"
            >
              <ButtonBack className="focus:outline-none cursor-pointer">
                <div
                  className="bg-yellow-200 w-5 h-5 mr-2 rounded-full flex items-center cursor-pointer justify-center"
                  id="prev2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-left"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#1F2937"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                </div>
              </ButtonBack>
              <Slider className="w-50 h-52 shadow-md rounded-lg flex justify-center align-center">
                {showPictures}
              </Slider>
              <ButtonNext className="focus:outline-none cursor-pointer">
                <div
                  className="bg-yellow-200 w-5 h-5 ml-2 rounded-full flex items-center cursor-pointer justify-center"
                  id="next2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-right"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#1F2937"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="9 6 15 12 9 18" />
                  </svg>
                </div>
              </ButtonNext>
            </CarouselProvider>
          </div>
          <div className="border-t p-6 bg-green-200 dark:bg-gray-800 rounded-b-3xl">
            <div className="flex items-baseline">
              <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                {product.department.name}
              </span>
            </div>
            <h3 className="mt-2 text-xl font-semibold leading-tight mb-2">
              {`${product.completeName.brand} ${product.completeName.productName}, ${product.completeName.shortDesc}, ${product.completeName.productDesc1}, ${product.completeName.productDesc2}, ${product.completeName.productDesc3}, ${product.completeName.color}`}
            </h3>
            <div className="flex items-center pt-3">
              <div className="pr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={14}
                  height={13}
                  viewBox="0 0 14 13"
                  fill="none"
                >
                  <path
                    d="M6.52447 0.463524C6.67415 0.00286841 7.32585 0.00286996 7.47553 0.463525L8.68386 4.18237C8.75079 4.38838 8.94277 4.52786 9.15938 4.52786H13.0696C13.554 4.52786 13.7554 5.14767 13.3635 5.43237L10.2001 7.73075C10.0248 7.85807 9.95149 8.08375 10.0184 8.28976L11.2268 12.0086C11.3764 12.4693 10.8492 12.8523 10.4573 12.5676L7.29389 10.2693C7.11865 10.1419 6.88135 10.1419 6.70611 10.2693L3.54267 12.5676C3.15081 12.8523 2.62357 12.4693 2.77325 12.0086L3.98157 8.28976C4.04851 8.08375 3.97518 7.85807 3.79994 7.73075L0.636495 5.43237C0.244639 5.14767 0.446028 4.52786 0.93039 4.52786H4.84062C5.05723 4.52786 5.24921 4.38838 5.31614 4.18237L6.52447 0.463524Z"
                    fill={starRating >= 1 ? "#F59E0B" : "#9CA3AF"}
                  />
                </svg>
              </div>
              <div className="pr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={14}
                  height={13}
                  viewBox="0 0 14 13"
                  fill="none"
                >
                  <path
                    d="M6.52447 0.463524C6.67415 0.00286841 7.32585 0.00286996 7.47553 0.463525L8.68386 4.18237C8.75079 4.38838 8.94277 4.52786 9.15938 4.52786H13.0696C13.554 4.52786 13.7554 5.14767 13.3635 5.43237L10.2001 7.73075C10.0248 7.85807 9.95149 8.08375 10.0184 8.28976L11.2268 12.0086C11.3764 12.4693 10.8492 12.8523 10.4573 12.5676L7.29389 10.2693C7.11865 10.1419 6.88135 10.1419 6.70611 10.2693L3.54267 12.5676C3.15081 12.8523 2.62357 12.4693 2.77325 12.0086L3.98157 8.28976C4.04851 8.08375 3.97518 7.85807 3.79994 7.73075L0.636495 5.43237C0.244639 5.14767 0.446028 4.52786 0.93039 4.52786H4.84062C5.05723 4.52786 5.24921 4.38838 5.31614 4.18237L6.52447 0.463524Z"
                    fill={starRating >= 2 ? "#F59E0B" : "#9CA3AF"}
                  />
                </svg>
              </div>
              <div className="pr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={14}
                  height={13}
                  viewBox="0 0 14 13"
                  fill="none"
                >
                  <path
                    d="M6.52447 0.463524C6.67415 0.00286841 7.32585 0.00286996 7.47553 0.463525L8.68386 4.18237C8.75079 4.38838 8.94277 4.52786 9.15938 4.52786H13.0696C13.554 4.52786 13.7554 5.14767 13.3635 5.43237L10.2001 7.73075C10.0248 7.85807 9.95149 8.08375 10.0184 8.28976L11.2268 12.0086C11.3764 12.4693 10.8492 12.8523 10.4573 12.5676L7.29389 10.2693C7.11865 10.1419 6.88135 10.1419 6.70611 10.2693L3.54267 12.5676C3.15081 12.8523 2.62357 12.4693 2.77325 12.0086L3.98157 8.28976C4.04851 8.08375 3.97518 7.85807 3.79994 7.73075L0.636495 5.43237C0.244639 5.14767 0.446028 4.52786 0.93039 4.52786H4.84062C5.05723 4.52786 5.24921 4.38838 5.31614 4.18237L6.52447 0.463524Z"
                    fill={starRating >= 3 ? "#F59E0B" : "#9CA3AF"}
                  />
                </svg>
              </div>
              <div className="pr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={14}
                  height={13}
                  viewBox="0 0 14 13"
                  fill="none"
                >
                  <path
                    d="M6.52447 0.463524C6.67415 0.00286841 7.32585 0.00286996 7.47553 0.463525L8.68386 4.18237C8.75079 4.38838 8.94277 4.52786 9.15938 4.52786H13.0696C13.554 4.52786 13.7554 5.14767 13.3635 5.43237L10.2001 7.73075C10.0248 7.85807 9.95149 8.08375 10.0184 8.28976L11.2268 12.0086C11.3764 12.4693 10.8492 12.8523 10.4573 12.5676L7.29389 10.2693C7.11865 10.1419 6.88135 10.1419 6.70611 10.2693L3.54267 12.5676C3.15081 12.8523 2.62357 12.4693 2.77325 12.0086L3.98157 8.28976C4.04851 8.08375 3.97518 7.85807 3.79994 7.73075L0.636495 5.43237C0.244639 5.14767 0.446028 4.52786 0.93039 4.52786H4.84062C5.05723 4.52786 5.24921 4.38838 5.31614 4.18237L6.52447 0.463524Z"
                    fill={starRating >= 4 ? "#F59E0B" : "#9CA3AF"}
                  />
                </svg>
              </div>
              <div className="pr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={14}
                  height={13}
                  viewBox="0 0 14 13"
                  fill="none"
                >
                  <path
                    d="M6.52447 0.463524C6.67415 0.00286841 7.32585 0.00286996 7.47553 0.463525L8.68386 4.18237C8.75079 4.38838 8.94277 4.52786 9.15938 4.52786H13.0696C13.554 4.52786 13.7554 5.14767 13.3635 5.43237L10.2001 7.73075C10.0248 7.85807 9.95149 8.08375 10.0184 8.28976L11.2268 12.0086C11.3764 12.4693 10.8492 12.8523 10.4573 12.5676L7.29389 10.2693C7.11865 10.1419 6.88135 10.1419 6.70611 10.2693L3.54267 12.5676C3.15081 12.8523 2.62357 12.4693 2.77325 12.0086L3.98157 8.28976C4.04851 8.08375 3.97518 7.85807 3.79994 7.73075L0.636495 5.43237C0.244639 5.14767 0.446028 4.52786 0.93039 4.52786H4.84062C5.05723 4.52786 5.24921 4.38838 5.31614 4.18237L6.52447 0.463524Z"
                    fill={starRating >= 5 ? "#F59E0B" : "#9CA3AF"}
                  />
                </svg>
              </div>
              <p
                className={`text-base font-medium leading-4 ${
                  starRating > 0 ? "text-yellow-600" : "text-gray-500"
                }`}
              >
                {starRating > 0
                  ? `${starRating} ${starRating === 1 ? "star" : "stars"}`
                  : "No ratings yet"}
              </p>
            </div>
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
            <div
              onClick={() => {
                handleAddToCart(product);
              }}
              value={product._id}
              className={`flex justify-end`}
            >
              <button className="text-green-700 bg-transparent ring-green-700 ring-2 dark:text-gray-100 dark:bg-indigo-700 border px-8 py-2 text-sm font-medium leading-3 rounded focus:outline-none mt-5 hover:opacity-50">
                <span className="sr-only">View shopping cart</span>
                <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCardSlideshow;
