import { useContext, useEffect, useState } from "react";
import OrderOverview from "./OrderOverview";

import CartContext from "../../store/cart-context";
import LoadingOverlay from "../UI/LoadingOverlay";

import jwt_decode from "jwt-decode";

const OrderSent = () => {
  const { lastOrder } = useContext(CartContext);
  const [order, setOrder] = useState(() => {
    const fetchLastOrder = async () => {
      console.log("fetching last order");
      const userToken = jwt_decode(localStorage.getItem("token"));
      try {
        const res = await fetch(`api/order/${userToken._id}`);
        const result = await res.json();
        if (result) {
          setOrder(result.result);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    if (lastOrder && Object.keys(lastOrder).length > 0) {
      setOrder(lastOrder);
    } else {
      fetchLastOrder();
    }
  });

  return (
    <>
      {!order ? (
        <LoadingOverlay />
      ) : (
        <>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-4">{`Your order (${order.orderId}) was received!`}</h2>
            <p className="mb-2">
              You will receive a confirmation via e-mail. You should receive your order betweeen 2-5 working days depending on
              your location.
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
            <h3 className="font-bold text-xl">{"Order overview:"}</h3>
            <OrderOverview items={order.items} />
          </div>
        </>
      )}
    </>
  );
};

export default OrderSent;
