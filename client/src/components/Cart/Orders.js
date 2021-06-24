import { useEffect, useState } from "react";
import OrderOverview from "./OrderOverview";
import NothingFound from "../MainContent/Results/NothingFound";

import useHttp from "../../hooks/use-http";
import jwt_decode from "jwt-decode";
import LoadingOverlay from "../UI/LoadingOverlay";

const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const { sendRequest: fetchOrders } = useHttp();

  useEffect(() => {
    const userToken = jwt_decode(localStorage.getItem("token"));
    const handleFetchedOrders = (result) => {
      setIsLoading(false);
      if (!result.ordersFound) {
        setOrders([]);
        return;
      }
      setOrders(result.result);
    };
    fetchOrders({ url: `/api/order/${userToken._id}` }, handleFetchedOrders);
  }, [fetchOrders]);

  const formatDate = (dateObj) => {
    dateObj = Date.parse(dateObj);
    dateObj = new Date(dateObj);
    const date = dateObj.getDate();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Since getMonth() returns month from 0-11 not 1-12
    const year = dateObj.getFullYear();

    const hour = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();

    const dateStr = `${date}/${month}/${year} (${hour}:${minutes}:${seconds})`;
    return dateStr;
  };

  const capitalizeWord = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  const capitalizeOnlyFirst = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const showOrders = orders.map((order) => {
    return (
      <div key={order.orderId}>
        <h3 className="font-bold text-xl mt-6">
          Order number # {order.orderId}
        </h3>
        <h3 className="font-bold text-xl">
          Order sent:{" "}
          <span className="font-normal text-sm">
            {formatDate(order.creationDate)}
          </span>
        </h3>
        <h3 className="font-bold text-xl">
          Sent to:{" "}
          <span className="font-normal text-sm">
            {`${capitalizeOnlyFirst(order.userAddress.street)}, ${
              order.userAddress.zip
            } ${capitalizeWord(order.userAddress.city)},  ${capitalizeOnlyFirst(
              order.userAddress.province
            )}`}
          </span>
        </h3>
        <OrderOverview classes="mb-12" items={order.items} id={order.orderId} />
      </div>
    );
  });

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <h2 className="-mt-4 mb-8 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Your orders
      </h2>
      <div>{orders.length > 0 ? showOrders : <NothingFound />}</div>
    </>
  );
};

export default Orders;
