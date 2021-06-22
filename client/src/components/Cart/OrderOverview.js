import React, { useEffect, useState } from "react";

import { StarIcon } from "@heroicons/react/outline";
import RatingSystem from "../UI/RatingSystem";

// Custom hook for querying APIK
import useHttp from "../../hooks/use-http";

const OrderOverview = ({ items, classes }) => {
  const [showRatingSystem, setShowRatingSystem] = useState(false);
  const [currentItem, setCurrentItem] = useState("");
  const [ratingValue, setRatingValue] = useState(0);
  const [showSuccessRating, setShowSuccessRating] = useState([]);
  const [setShowErrorRating] = useState([]);
  const [setAlreadyRatedProducts] = useState([]);

  const { sendRequest: updateRating } = useHttp();

  useEffect(() => {
    setRatingValue(0);
  }, []);

  // When pressing star icon to show rating system
  const handleStarButton = (id) => {
    if (currentItem === id || currentItem === "") {
      setShowRatingSystem((prevState) => {
        if (prevState) {
          setCurrentItem("");
        }

        return !prevState;
      });
    }
    // Remove from error list
    setShowErrorRating((prevState) => {
      return [...prevState].filter((el) => {
        return el !== id;
      });
    });
    setCurrentItem(id);
    setRatingValue(0);
  };

  const getRatingValue = (value) => {
    console.log(value, "value is");
    setRatingValue(value);
  };

  const handleSubmitRating = (id) => {
    const handleModifiedRating = (res) => {
      setShowSuccessRating((prevState) => {
        return [...prevState, id];
      });
      setAlreadyRatedProducts((prevState) => {
        return [...prevState, id];
      });
    };

    const handleErrorRating = () => {
      console.log("ERROR!!!");
      setShowErrorRating((prevState) => {
        return [...prevState, id];
      });
    };

    console.log(ratingValue, "value");
    if (ratingValue) {
      updateRating(
        {
          url: `api/products/rating/${id}`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            rating: ratingValue,
          },
        },
        handleModifiedRating,
        handleErrorRating
      );
    }
  };

  const showRatingContent = (id) => {
    console.log("IDIDDD", showSuccessRating.indexOf(id));
    if (showSuccessRating.indexOf(id) !== -1) {
      return <p className="font-bold">Your rating was saved!</p>;
    } else if (showSuccessRating.indexOf(id) !== -1) {
      return <p className="font-bold">An error ocurred!</p>;
    } else {
      return (
        <>
          <RatingSystem getRatingValue={getRatingValue} />
          <button
            onClick={() => handleSubmitRating(id)}
            type="button"
            className="inline-flex justify-center py-2 px-4 my-2  ml-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Rate
          </button>
        </>
      );
    }
  };

  const showCartItems = items.map((item, index) => {
    return (
      <>
        <tr
          className={`h-24 border-gray-300 dark:border-gray-200 border-b `}
          key={`item-${item._id}`}
        >
          {/* Image */}
          <td className="hidden md:table-cell text-sm whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
            <img
              src={item.pictures[0].url}
              className="w-16 h-16 mx-auto object-contain rounded-full ring-2 ring-green-500"
              alt={item.pictures[0].alt}
            />
          </td>
          {/* Description */}
          <td className="text-sm whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
            <p className="mb-2 md:ml-4">{`${item.completeName.brand} ${item.completeName.productName}, ${item.completeName.color}, ${item.completeName.productGender}`}</p>
          </td>
          {/* Quantity */}
          <td className="text-center text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
            <div className="relative flex flex-row justify-center w-12 h-8">
              <p>{item.quantity}</p>
            </div>
          </td>
          {/* Unit price */}
          <td className="pr-4 whitespace-no-wrap  hidden md:table-cell">
            <div className="text-center">
              <span className="text-xs lg:text-base font-medium">{`${
                item.pricingInfo.price
              }${String.fromCharCode(160)}€`}</span>
            </div>
          </td>
          {/* Total price */}
          <td className="text-center text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
            <span className="text-sm lg:text-base font-medium">{`${(
              item.pricingInfo.price * item.quantity
            ).toFixed(2)}${String.fromCharCode(160)}€`}</span>
          </td>
          {/* Rate product */}
          <td className="text-center text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
            <span className="sr-only">Rate product</span>
            <StarIcon
              onClick={() => handleStarButton(item._id)}
              fill={`${
                showRatingSystem && currentItem === item._id
                  ? "#FDE68A"
                  : "#FFFF"
              }`}
              className={`h-6 cursor-pointer`}
            />
          </td>
        </tr>

        {showRatingSystem && currentItem === item._id && (
          <tr
            className={`h-16 border-gray-300 dark:border-gray-200 border-b `}
            key={`rating-${item._id}`}
          >
            <td
              colSpan={6}
              className="text-sm whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4"
            >
              <div className="flex justify-center">
                {showRatingContent(item._id)}
              </div>
            </td>
          </tr>
        )}
      </>
    );
  });

  return (
    <>
      <div className={`w-full ${classes}`}>
        <table className="min-w-full overflow-x-auto">
          <thead>
            <tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8">
              <th className="w-2/12 hidden md:table-cell text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4"></th>
              <th className="w-5/12  text-center text-gray-600 dark:text-gray-400 font-bold pr-6 text-sm tracking-normal leading-4">
                Product
              </th>
              <th className="w-1/12  text-center text-gray-600 dark:text-gray-400 font-bold pr-6 text-sm tracking-normal leading-4">
                Quantity
              </th>
              <th className="w-1/12  text-center hidden md:table-cell text-gray-600 dark:text-gray-400 font-bold pr-6 text-sm tracking-normal leading-4">
                Unit
              </th>
              <th className="w-2/12  text-center text-gray-600 dark:text-gray-400 font-bold pr-8 text-sm tracking-normal leading-4">
                Total
              </th>
              <th className="w-2/12  text-center text-gray-600 dark:text-gray-400 font-bold pr-8 text-sm tracking-normal leading-4">
                Rate
              </th>
            </tr>
          </thead>
          <tbody>{showCartItems}</tbody>
        </table>
      </div>
    </>
  );
};
export default OrderOverview;
