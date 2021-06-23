const express = require("express");
const router = express.Router();

const ordersController = require("../controllers/orders");
const validateObjectId = require("../middleware/validateObjectId");

// POST a new payment
router.post("/payment", ordersController.makePayment);

// GET latest order
router.get("/latest/:id", validateObjectId, ordersController.getNewestorder);

// GET all orders from user
router.get("/:id", validateObjectId, ordersController.getOrdersFromUser);

// POST a new order after payment
router.post("/:id", validateObjectId, ordersController.saveOrder);

module.exports = router;
