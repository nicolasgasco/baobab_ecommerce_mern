const express = require("express");
const router = express.Router();

const paymentsController = require("../controllers/payments");

// POST a new payment
router.post("/payment", paymentsController.makePayment);

module.exports = router;
