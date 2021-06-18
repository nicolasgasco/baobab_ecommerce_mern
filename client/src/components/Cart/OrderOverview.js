import React from "react";

const CartTable = ({ items }) => {
  const showCartItems = items.map((item) => {
    return (
      <tr className="h-24 border-gray-300 dark:border-gray-200 border-b">
        <td className="hidden md:table-cell text-sm whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
          <img
            src={item.pictures[0].url}
            className="w-16 h-16 mx-auto object-contain rounded-full ring-2 ring-green-500"
            alt={item.pictures[0].alt}
          />
        </td>
        <td className="text-sm whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
          <p className="mb-2 md:ml-4">{`${item.completeName.brand} ${item.completeName.productName}, ${item.completeName.color}, ${item.completeName.productGender}`}</p>
        </td>

        <td className="text-center  text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
          <div className="relative flex flex-row w-12 h-8">
            <p>{item.quantity}</p>
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
      <div className="w-full">
        <table className="min-w-full overflow-x-auto ">
          <thead>
            <tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8">
              <th className="w-2/12 hidden md:table-cell text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4"></th>
              <th className="w-5/12  text-center text-gray-600 dark:text-gray-400 font-bold pr-6 text-sm tracking-normal leading-4">
                Product
              </th>
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
