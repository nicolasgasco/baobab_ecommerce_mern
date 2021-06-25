import { useContext, useState } from "react";
import OrderOverview from "../components/Cart/OrderOverview";

import CartContext from "../store/cart-context";
import LoadingOverlay from "../components/UI/LoadingOverlay";

import jwt_decode from "jwt-decode";

import useHttp from "../hooks/use-http";

const OrderSent = () => {
  // const { lastOrder } = useContext(CartContext);
  const { sendRequest: fetchLastOrder } = useHttp();

  const [order, setOrder] = useState(() => {
    // I don't remember why I put this part, but it was breaking my code
    // if (lastOrder && Object.keys(lastOrder).length > 0) {
    //   return lastOrder;
    // } else {
    const handleFetchedOrder = (result) => {
      setOrder(result.result);
    };
    const userToken = jwt_decode(localStorage.getItem("token"));

    fetchLastOrder(
      { url: `api/order/latest/${userToken._id}` },
      handleFetchedOrder
    );
    // }
  });

  const formatDate = (dateObj) => {
    const date = dateObj.getDate();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Since getMonth() returns month from 0-11 not 1-12
    const year = dateObj.getFullYear();

    const dateStr = date + "/" + month + "/" + year;
    return dateStr;
  };

  return (
    <>
      {!order ? (
        <LoadingOverlay />
      ) : (
        <div className={"p-6"}>
          <div className="text-xl">
            <h2 className="mb-4 -mt-4 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {`Your order (${order.orderId}) was received!`}
            </h2>
            <p className="mb-2 ">
              You will receive confirmation via e-mail. You should receive your
              order betweeen 2-5 working days depending on your location.
            </p>
            <p>
              {"For any query or doubt, contact with our "}
              <a
                className="font-bold text-green-600 hover:underline"
                href="mailto:baobad@example.com"
              >
                Customer support
              </a>
              {"."}
            </p>
          </div>
          <div className="mt-6">
            <h3 className="font-bold text-2xl">{"Order overview:"}</h3>
            <OrderOverview items={order.items} />
            <h4 className="mt-8">
              <span className="font-bold">Estimated arrival date: </span>
              {`${formatDate(new Date())} - ${formatDate(new Date())}.`}
            </h4>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderSent;
