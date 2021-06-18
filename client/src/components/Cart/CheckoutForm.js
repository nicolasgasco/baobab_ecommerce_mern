import React, { useState, useEffect, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import jwt_decode from "jwt-decode";

import styles from "./PaymentForm.module.css";
import { CreditCardIcon } from "@heroicons/react/outline";

import CartContext from "../../store/cart-context";
import { useHistory } from "react-router";

export default function CheckoutForm() {
  const { items, saveOrder } = useContext(CartContext);

  const history = useHistory();

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("/api/order/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((err) => {
        console.log("Error: " + err.message);
        setProcessing(false);
      });
  }, [items]);

  const cardStyle = {
    style: {
      base: {
        color: "black",
        fontFamily: "Roboto, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "black",
        },
      },
      invalid: {
        color: "#EF4444",
        iconColor: "#EF4444",
      },
    },
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      console.log("payment processed");
      const userId = jwt_decode(localStorage.getItem("token"))._id;
      saveOrder(userId, items);
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      history.push("/success");
    }
  };

  return (
    <div className="w-full mx-auto" style={{ maxWidth: "600px" }}>
      <div className="w-full pt-1 pb-5">
        <div className="bg-yellow-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
          <CreditCardIcon className="w-2/3" />
        </div>
      </div>
      <div className="mb-10">
        <h2 className="text-center font-bold text-xl uppercase">
          Secure payment info
        </h2>
      </div>
      <form onSubmit={handleSubmit} className={"w-full"}>
        <CardElement
          className={`${styles.input}`}
          options={cardStyle}
          onChange={handleChange}
        />
        <button
          disabled={processing || disabled || succeeded}
          className={`${styles["submit"]} ${styles["button"]}`}
        >
          <span className={styles["button-text"]}>
            {processing ? (
              <div className={styles["spinner"]} id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {
          <div
            className={`${
              !error && "invisible"
            } card-error text-center text-red-600 font-bold mt-2`}
            role="alert"
          >
            {error ? error : "No error"}
          </div>
        }
        {/* Show a success message upon completion */}
        {/* {succeeded && (
          <p className={succeeded ? "result-message" : "result-message hidden"}>
            Payment succeeded!
          </p>
        )} */}
      </form>
      <div className="px- mt-6 flex justify-end">
        <img
          src="https://res.cloudinary.com/ngasco/image/upload/v1623952029/bonsai_background/logo-stripe_ouoag3.png"
          alt="Logos of Visa, MasterCard, American Express, and Discover"
          className="w-1/3"
        />
      </div>
    </div>
  );
}
