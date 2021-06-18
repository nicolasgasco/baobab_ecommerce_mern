const express = require("express");
const router = express.Router();

const ordersController = require("../controllers/payments");
const validateObjectId = require("../middleware/validateObjectId");

// POST a new payment
router.post("/payment", ordersController.makePayment);

// GET latest order
router.get("/:id", validateObjectId, ordersController.getNewestorder);

// POST a new order after payment
router.post("/:id", validateObjectId, ordersController.saveOrder);

module.exports = router;
