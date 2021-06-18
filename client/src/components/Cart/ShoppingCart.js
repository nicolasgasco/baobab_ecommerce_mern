import { useContext, useEffect, useState } from "react";

import CartContext from "../../store/cart-context";
import NothingFound from "../../components/MainContent/Results/NothingFound";

import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import CartTable from "./CartTable";

const ShoppingCart = () => {
  const { items, totalPrice } = useContext(CartContext);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      // Fetching userData from database
      if (localStorage.getItem("token")) {
        try {
          const { _id: id } = jwt_decode(localStorage.getItem("token"));
          // Get user and see if there's already an address
          const res = await fetch(`/api/users/${id}`);
          const user = await res.json();
          if (user.resultsFound) {
            setUserData(user.result);
          } else {
            throw new Error();
          }
        } catch (err) {
          console.log(err.message);
        }
      }
    };
    fetchUserData();
  }, []);

  // useEffect(() => {
  //   if (items.length !== 0) {
  //     setCartItems(items);
  //   }
  // }, [items]);

  // const removeItem = (id) => {
  //   setIsLoading(true);
  //   removeItemFromCart(id);
  //   // Otherwise not working for last item
  //   if (cartItems.length === 1) setCartItems([]);
  // };

  // useEffect(() => {
  //   if (isLoading) setIsLoading(false);
  //   // It works better without adding isLoading as dependency
  // }, [items]);

  let showShippingInfo;
  if (userData.address) {
    showShippingInfo = (
      <div>
        <p classList="font-bold">{`${userData.name} ${userData.surname}`}</p>
        <div>
          <p>{userData.address.street}</p>
          <p>{`${userData.address.zip}, ${userData.address.province}, ${userData.address.city}`}</p>
          {/* <p>{userData.address.zip}</p> */}
        </div>
        <Link
          to="/profile"
          className="flex justify-center w-10/12 mx-auto px-10 py-3 mt-6 font-medium text-white uppercase bg-green-600 rounded-md shadow item-center hover:bg-green-700 focus:shadow-outline focus:outline-none"
        >
          Change address
        </Link>
      </div>
    );
  } else if (localStorage.getItem("token")) {
    showShippingInfo = (
      <div>
        <p>Provide an address to proceed with payment.</p>
        <Link
          to="/profile"
          className="flex justify-center w-10/12 mx-auto px-10 py-3 mt-6 font-medium text-white uppercase bg-green-600 rounded-md shadow item-center hover:bg-green-700 focus:shadow-outline focus:outline-none"
        >
          Add address
        </Link>
      </div>
    );
  } else {
    showShippingInfo = (
      <div>
        <p>Create an account to complete your order.</p>
        <Link
          to="/signin"
          className="flex justify-center w-10/12 mx-auto px-10 py-3 mt-6 font-medium text-white uppercase bg-green-600 rounded-md shadow item-center hover:bg-green-700 focus:shadow-outline focus:outline-none"
        >
          Create account
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="lg:px-6 mx-0 md:mx-6">
        {items.length === 0 && <NothingFound />}
        {items.length !== 0 && (
          <>
            <CartTable />
            <div className="my-4 mt-6 -mx-2">
              <div className="lg:px-2">
                <div className="p-4 w-11/12 md:w-full mx-auto bg-yellow-200 rounded-full">
                  <h2 className="ml-2 font-bold uppercase">Shipping info</h2>
                </div>
                <div className="p-4">{showShippingInfo}</div>
              </div>
              <div className="lg:px-2 mt-4">
                <div className="p-4 w-11/12 md:w-full mx-auto bg-yellow-200 rounded-full">
                  <h1 className="ml-2 font-bold uppercase">Order Details</h1>
                </div>
                <div className="p-4">
                  <div className="flex justify-between pt-4 border-b">
                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                      Total
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                      {totalPrice.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <Link
                      to={"/checkout"}
                      className={`${
                        userData.address
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-gray-400"
                      }           flex justify-center w-10/12 mx-auto px-10 py-3 mt-6 font-medium text-white uppercase bg-green-600 rounded-md shadow item-center hover:bg-green-700 focus:shadow-outline focus:outline-none`}
                    >
                      <svg
                        aria-hidden="true"
                        data-prefix="far"
                        data-icon="credit-card"
                        className="w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path
                          fill="currentColor"
                          d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"
                        />
                      </svg>
                      <span className="ml-2 mt-5px">Checkout</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;

// const showCartItems = cartItems.map((item) => {
//   return (
//     <tr id={`cart-item-${item._id}`}>
//       <td className="hidden pb-4 md:table-cell">
//         <img
//           src={item.pictures[0].url}
//           className="w-20 h-20 object-contain rounded-full ring-2 ring-green-500"
//           alt={item.pictures[0].alt}
//         />
//       </td>
//       <td>
//         <p className="mb-2 md:ml-4 ">{`${item.completeName.brand} ${item.completeName.productName}, ${item.completeName.color}, ${item.completeName.productGender}`}</p>
//         <div className="cursor-pointer">
//           <span className="sr-only">Remove item</span>
//           <TrashIcon
//             id={`cart-item-${item._id}`}
//             onClick={() => {
//               removeItem(item._id);
//             }}
//             className="h-6 w-6 ml-4 mt-1"
//             aria-hidden="true"
//           />
//         </div>
//       </td>
//       <td className="justify-center md:justify-end md:flex md:mt-4">
//         <div className="w-20 h-10">
//           <div className="relative flex flex-row w-16 h-8 mt-1">
//             <input
//               id={item._id}
//               type="number"
//               defaultValue={item.quantity}
//               min={1}
//               max={9}
//               onChange={changeItemQuantity}
//               className="w-full font-semibold text-center text-gray-700 bg-yellow-200 rounded-md outline-none focus:outline-none hover:text-black focus:text-black"
//             />
//           </div>
//         </div>
//       </td>
//       <td className="hidden text-right md:table-cell">
//         <span className="text-sm lg:text-base font-medium">{`${item.pricingInfo.price} €`}</span>
//       </td>
//       <td className="text-right">
//         <span className="text-sm lg:text-base font-medium">{`${(
//           item.pricingInfo.price * item.quantity
//         ).toFixed(2)} €`}</span>
//       </td>
//     </tr>
//   );
// });

{
  /* <table
              className="w-full outline-black  text-sm lg:text-base"
              cellSpacing={0}
            >
              <thead className="outline-black">
                <tr className="h-12 uppercase text-center">
                  <th className="hidden md:table-cell outline-black" />
                  <th className="outline-black">Product</th>
                  <th className="pl-5 lg:pl-0 outline-black">
                    <span className="lg:hidden" title="Quantity">
                      Qtd
                    </span>
                    <span className="hidden lg:inline">Quantity</span>
                  </th>
                  <th className="hidden md:table-cell outline-black">Unit</th>
                  <th className="outline-black">Total</th>
                </tr>
              </thead>
              <tbody>{showCartItems}</tbody>
            </table> */
}
{
  /* <hr className="pb-6 mt-6" /> */
}
