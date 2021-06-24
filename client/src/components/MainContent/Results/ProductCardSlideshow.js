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
import PictureOverlay from "./PictureOverlay";

import CartContext from "../../../store/cart-context";
import useHttp from "../../../hooks/use-http";
import RatingSystem from "../../UI/RatingSystem";

const ProductCardSlideshow = ({ product, picturesLoading, classes }) => {
  const { addItemToCart } = useContext(CartContext);
  const [starRating, setStarRating] = useState(0);
  const [overlayData, setOverlayData] = useState({});
  const [overlayOpen, setOverlayOpen] = useState(false);

  // Get product rating
  useEffect(() => {
    if (product.ratingInfo.starRating) {
      setStarRating(product.ratingInfo.starRating);
    }
  }, [product.ratingInfo.starRating]);

  // Custom hook per HTTP requests
  const { isLoading, setIsLoading } = useHttp();

  const handleAddToCart = (id) => {
    setIsLoading(true);
    addItemToCart(id);
    setIsLoading(false);
  };

  const handleOpenPicture = (imgData) => {
    setOverlayData({ src: imgData.src, alt: imgData.alt });
    setOverlayOpen(true);
  };

  const handleClosePicture = () => {
    setOverlayOpen(false);
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
          <Slide
            key={index + 1}
            className="flex items-center justify-center"
            index={index + 1}
          >
            <img
              onClick={(e) => handleOpenPicture(e.target)}
              src={picture.url}
              alt={picture.alt}
              className="mx-auto h-52 w-52 object-cover object-center z-0"
            />
          </Slide>
        );
      }
    });
  }
  return (
    <>
      {isLoading && <LoadingOverlay />}
      {overlayOpen && (
        <PictureOverlay
          src={overlayData.src}
          alt={overlayData.alt}
          handleClosePicture={handleClosePicture}
          showPictures={showPictures}
        />
      )}
      <div
        key={`product-${product._id}`}
        className={`pb-10 md:px-4 w-full md:w-1/2 xl:w-1/3 max-w-sm px-2 h-full ${classes}`}
      >
        <div className="shadow-lg rounded-3xl z-0 ">
          <div
            className="rounded-t-3xl bg-white px-2
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
              <ButtonBack
                className={`${
                  product.pictures.length <= 1 && "invisible"
                } focus:outline-none cursor-pointer`}
              >
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
              <Slider className="shadow-md h-52 w-52 rounded-lg">
                {showPictures}
              </Slider>
              <ButtonNext
                className={`${
                  product.pictures.length <= 1 && "invisible"
                } focus:outline-none cursor-pointer`}
              >
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
            <div className="">
              <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                {product.department.name}
              </span>
            </div>
            <div className="">
              <h3 className="mt-2 text-xl font-semibold leading-tight mb-2">
                {`${product.completeName.brand} ${product.completeName.productName}, ${product.completeName.shortDesc}, ${product.completeName.productDesc1}, ${product.completeName.productDesc2}, ${product.completeName.productDesc3}, ${product.completeName.color}`}
              </h3>
            </div>
            <div className="flex items-center pt-3">
              <RatingSystem
                notInteractive={true}
                ratingValue={product.ratingInfo.starRating}
              />
              <p
                className={`ml-2 text-base font-medium leading-4 ${
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
                  )
                    .toFixed(0)
                    .toString()
                    .padStart(2, "0")}
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
            <div className="mt-4 rounded-md">
              <span className="text-teal-600 text-md font-semibold uppercase">
                Social:
              </span>
              <span className="text-sm text-gray-600">
                {` ${product.ecoInfo.socialMission}`}
              </span>
            </div>
            <div className="mt-4 rounded-md">
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
