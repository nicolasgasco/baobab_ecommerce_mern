const stripe = require("stripe")(process.env.STRIPE_KEY);

const calculateOrderAmount = (items) => {
  return 1400;
};

const makePayment = async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

exports.makePayment = makePayment;
