import { useContext, useEffect, useState } from "react";

import CartContext from "../store/cart-context";
import NothingFound from "../components/MainContent/Results/NothingFound";

import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import CartTable from "../components/Cart/CartTable";
import useHttp from "../hooks/use-http";

const ShoppingCart = () => {
  const { items, totalPrice, setUserAddress } = useContext(CartContext);

  const [userData, setUserData] = useState({});

  const { sendRequest: fetchUser } = useHttp();

  useEffect(() => {
    const fetchUserData = async () => {
      // Fetching userData from database
      if (localStorage.getItem("token")) {
        const handleUserFound = (user) => {
          if (user.resultsFound) {
            setUserData(user.result);
          } else {
            throw new Error("User not found");
          }
        };

        const { _id: id } = jwt_decode(
          localStorage.getItem("token"),
          handleUserFound
        );
        fetchUser({ url: `/api/users/${id}` }, handleUserFound);
      }
    };
    fetchUserData();
  }, [fetchUser]);

  let showShippingInfo;
  if (userData.address) {
    setUserAddress(userData.address);
    showShippingInfo = (
      <div>
        <p className="font-bold">{`${userData.name} ${userData.surname}`}</p>
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
        <p>Create an account or log in to complete your order.</p>
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
        <h2 className="mb-8 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Your shopping cart
        </h2>
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
                      {`${totalPrice.toFixed(2)} €`}
                    </div>
                  </div>
                  <div>
                    <Link
                      to={userData.address ? "/checkout" : "/cart"}
                      className={`${
                        userData.address
                          ? "bg-green-600  hover:bg-green-700"
                          : "bg-gray-400 cursor-default"
                      } flex justify-center w-10/12 mx-auto px-10 py-3 mt-6 font-medium text-white uppercasrounded-md shadow item-center  focus:shadow-outline focus:outline-none`}
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
