const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const { productSchema } = require("./products");

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
      type: String,
      default: nanoid(),
    },
    userId: {
      // Otherwise it triggers duplicate key error
      type: String,
      trim: true,
      lowercase: true,
      unique: false,
      index: false,
      required: [true, "User id is required"],
    },
    userAddress: {
      type: Object,
      required: [true, "User address is required"],
    },
    items: [
      {
        type: Object,
        required: [true, "Items are required"],
      },
    ],
    creationDate: { type: Date, default: Date.now },
  },
  { collection: "orders" }
);

const Order = mongoose.model("Order", orderSchema);

exports.orderSchema = orderSchema;
exports.Order = Order;
