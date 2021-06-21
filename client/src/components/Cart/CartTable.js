import { TrashIcon } from "@heroicons/react/outline";
import React, { useContext, useEffect, useState } from "react";
import LoadingOverlay from "../UI/LoadingOverlay";

import CartContext from "../../store/cart-context";

const CartTable = () => {
  const { items, removeItemFromCart, updateItemQuantity } =
    useContext(CartContext);

  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) setIsLoading(false);
    // It works better without adding isLoading as dependency
  }, [items]);

  useEffect(() => {
    if (items.length !== 0) {
      setCartItems(items);
    }
  }, [items]);

  const removeItem = (id) => {
    setIsLoading(true);
    removeItemFromCart(id);
    // Otherwise not working for last item
    if (cartItems.length === 1) setCartItems([]);
  };

  const changeItemQuantity = (event) => {
    updateItemQuantity(event.target.id, event.target.value);
  };

  const showCartItems = cartItems.map((item) => {
    return (
      <tr className="h-24 border-gray-300 dark:border-gray-200 border-b">
        <td className="hidden md:table-cell text-sm whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
          <img
            src={item.pictures[0].url}
            className="w-16 h-16 mx-auto object-contain rounded-sm ring-2 ring-green-500"
            alt={item.pictures[0].alt}
          />
        </td>
        <td className="text-sm whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
          <p className="mb-2 md:ml-4">{`${item.completeName.brand} ${item.completeName.productName}, ${item.completeName.color}, ${item.completeName.productGender}`}</p>
        </td>
        <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
          <div className="cursor-pointer">
            <span className="sr-only">Remove item</span>
            <TrashIcon
              id={`cart-item-${item._id}`}
              onClick={() => {
                removeItem(item._id);
              }}
              className="h-6 w-6 ml-4 mt-1"
              aria-hidden="true"
            />
          </div>
        </td>
        <td className="text-center  text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
          <div className="relative flex flex-row w-12 h-8">
            <input
              id={item._id}
              type="number"
              defaultValue={item.quantity}
              min={1}
              max={9}
              onChange={changeItemQuantity}
              className="w-full font-semibold text-center text-gray-700 bg-yellow-200 rounded-md outline-none focus:outline-none hover:text-black focus:text-black"
            />
          </div>
        </td>
        <td className="pr-4 whitespace-no-wrap">
          <div className="text-center">
            <span className="text-xs lg:text-base font-medium">{`${
              item.pricingInfo.price
            }${String.fromCharCode(160)}€`}</span>
          </div>
        </td>
        <td className="text-center text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
          <span className="text-sm lg:text-base font-medium">{`${(
            item.pricingInfo.price * item.quantity
          ).toFixed(2)}${String.fromCharCode(160)}€`}</span>
        </td>
      </tr>
    );
  });

  return (
    <>
      {isLoading && <LoadingOverlay />}

      <div className="w-full">
        <table className="min-w-full overflow-x-auto ">
          <thead>
            <tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8">
              <th className="w-2/12 hidden md:table-cell text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4"></th>
              <th className="w-5/12  text-center text-gray-600 dark:text-gray-400 font-bold pr-6 text-sm tracking-normal leading-4">
                Product
              </th>
              <th className="w-1/12  text-center text-gray-600 dark:text-gray-400 font-bold pr-6 text-sm tracking-normal leading-4"></th>
              <th className="w-1/12  text-center text-gray-600 dark:text-gray-400 font-bold pr-6 text-sm tracking-normal leading-4">
                Quantity
              </th>
              <th className="w-1/12  text-center text-gray-600 dark:text-gray-400 font-bold pr-6 text-sm tracking-normal leading-4">
                Unit
              </th>
              <th className="w-2/12  text-center text-gray-600 dark:text-gray-400 font-bold pr-8 text-sm tracking-normal leading-4">
                Total
              </th>
            </tr>
          </thead>
          <tbody>{showCartItems}</tbody>
        </table>
      </div>
    </>
  );
};
export default CartTable;
