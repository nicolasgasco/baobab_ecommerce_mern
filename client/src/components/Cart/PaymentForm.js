import { CreditCardIcon } from "@heroicons/react/outline";
import { useEffect, useRef, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import styles from "./PaymentForm.module.css";

const PaymentForm = () => {
  // Stripe related
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
      .fetch("/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

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
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  // Form related
  const [cardNumber, setCardNumber] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const nameOnCard = useRef();
  const expirationMonth = useRef();
  const expirationYear = useRef();

  const handleCardNumber = (event) => {
    setCardNumber(
      // Accepting only numbers and adding spaces every four characters
      event.target.value
        .replace(/[^\dA-Z]/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
    );
  };

  const handleSecurityCode = (event) => {
    setSecurityCode(
      // Accepting only numbers and adding spaces every four characters
      event.target.value.replace(/[^\dA-Z]/g, "").trim()
    );
  };

  const handleFormSubmit = (event) => {
    console.log("puta mierda");
    event.preventDefault();
    console.log({
      name: nameOnCard.current.value,
      //   Removing whitespaces from IBAN
      number: cardNumber.replaceAll(" ", ""),
      expirationMonth: expirationMonth.current.value,
      expirationYear: expirationYear.current.value,
      securityCode,
    });
  };
  return (
    <>
      <div>
        <form
          className={`${styles["payment-form"]} ${styles["card-element"]} ${styles["form"]} `}
          onSubmit={handleSubmit}
        >
          <CardElement
            className={styles.input}
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
          {error && (
            <div className={styles["card-error"]} role="alert">
              {error}
            </div>
          )}
          {/* Show a success message upon completion */}
          <p
            className={
              succeeded
                ? `${styles["result-message"]}`
                : `${styles["result-message hidden"]}`
            }
          >
            Payment succeeded, see the result in your
            <a href={`https://dashboard.stripe.com/test/payments`}>
              {" "}
              Stripe dashboard.
            </a>{" "}
            Refresh the page to pay again.
          </p>
        </form>

        <form
          onSubmit={handleFormSubmit}
          className="flex justify-center my-6 mt-16"
        >
          <div
            className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700"
            style={{ maxWidth: "600px" }}
          >
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
            <div className="mb-3 flex -mx-2">
              <div className="px-2">
                <label
                  htmlFor="type1"
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-yellow-500"
                    name="type"
                    id="type1"
                    defaultChecked
                  />
                  <img
                    src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                    alt="Logos of Visa, MasterCard, American Express, and Discover"
                    className="h-8 ml-3"
                  />
                </label>
              </div>
              {/* <div className="px-2">
              <label
                htmlFor="type2"
                className="flex items-center cursor-pointer"
              >
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-yellow-500"
                  name="type"
                  id="type2"
                />
                <img
                  src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png"
                  className="h-8 ml-3"
                />
              </label>
            </div> */}
            </div>

            <div className="mb-3">
              <label className="font-bold text-sm mb-2 ml-1">
                Name on card
              </label>
              <div>
                <input
                  ref={nameOnCard}
                  required
                  className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="John Doe"
                  type="text"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="font-bold text-sm mb-2 ml-1">Card number</label>
              <div>
                <input
                  required
                  maxLength={19}
                  onChange={handleCardNumber}
                  value={cardNumber}
                  className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="0000 0000 0000 0000"
                  type="text"
                />
              </div>
            </div>
            <div className="mb-3 -mx-2 flex items-end">
              <div className="px-2 w-1/2">
                <label className="font-bold text-sm mb-2 ml-1">
                  Expiration date
                </label>
                <div>
                  <select
                    required
                    ref={expirationMonth}
                    className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-yellow-500 transition-colors cursor-pointer"
                  >
                    <option value={1}>01 - January</option>
                    <option value={2}>02 - February</option>
                    <option value={3}>03 - March</option>
                    <option value={4}>04 - April</option>
                    <option value={5}>05 - May</option>
                    <option value={6}>06 - June</option>
                    <option value={7}>07 - July</option>
                    <option value={8}>08 - August</option>
                    <option value={9}>09 - September</option>
                    <option value={10}>10 - October</option>
                    <option value={11}>11 - November</option>
                    <option value={12}>12 - December</option>
                  </select>
                </div>
              </div>
              <div className="px-2 w-1/2">
                <select
                  required
                  ref={expirationYear}
                  className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-yellow-500 transition-colors cursor-pointer"
                >
                  <option value={2020}>2020</option>
                  <option value={2021}>2021</option>
                  <option value={2022}>2022</option>
                  <option value={2023}>2023</option>
                  <option value={2024}>2024</option>
                  <option value={2025}>2025</option>
                  <option value={2026}>2026</option>
                  <option value={2027}>2027</option>
                  <option value={2028}>2028</option>
                  <option value={2029}>2029</option>
                </select>
              </div>
            </div>
            <div className="mb-10">
              <label className="font-bold text-sm mb-2 ml-1">
                Security code (CVC)
              </label>
              <div>
                <input
                  required
                  minLength={3}
                  maxLength={3}
                  value={securityCode}
                  onChange={handleSecurityCode}
                  className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder={"000"}
                  type="text"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="block w-full max-w-xs mx-auto bg-yellow-500 hover:bg-yellow-700 focus:bg-yellow-700 text-white rounded-lg px-3 py-3 font-semibold"
              >
                <i className="mdi mdi-lock-outline mr-1" /> PAY NOW
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PaymentForm;
