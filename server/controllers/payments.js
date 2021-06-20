const { id } = require("../joi/password");
const productSchemaJoi = require("../joi/products");
const { Order } = require("../models/orders");

const stripe = require("stripe")(process.env.STRIPE_KEY);

const calculateOrderAmount = (items) => {
  const totalPrice = items.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.pricingInfo.price * currentValue.quantity;
  }, 0);
  return parseInt(totalPrice * 100);
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

const saveOrder = async (req, res) => {
  const items = req.body.items;

  const userId = req.params.id;
  const userAddress = req.body.userAddress;

  let foundError;
  items.every((item) => {
    const joiValidation = productSchemaJoi.validate(item);
    if (joiValidation.error) {
      res.status(400).send({
        error: joiValidation.error.details.map((err) => {
          return err.message;
        }),
      });
      foundError = true;
      return false;
    }
  });

  if (foundError) return;

  try {
    const newOrder = new Order({ userId, items, userAddress });
    const result = await newOrder.save();
    res.send({ orderAdded: 1, result });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const getNewestorder = async (req, res) => {
  const userId = req.params.id;

  try {
    const lastOrder = await Order.findOne({ userId }).sort({
      creationDate: -1,
    });
    if (lastOrder) {
      res.send({ orderFound: 1, result: lastOrder });
    } else {
      throw new Error("No order found");
    }
  } catch (err) {
    res.status(400).send({ error: err.mesasge });
  }
};

const getOrdersFromUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const allOrders = await Order.find({ userId }).sort({
      creationDate: -1,
    });
    if (allOrders) {
      res.send({ ordersFound: allOrders.length, result: allOrders });
    } else {
      throw new Error("No order found");
    }
  } catch (err) {
    res.status(400).send({ error: err.mesasge });
  }
};

exports.makePayment = makePayment;
exports.saveOrder = saveOrder;
exports.getNewestorder = getNewestorder;
exports.getOrdersFromUser = getOrdersFromUser;
