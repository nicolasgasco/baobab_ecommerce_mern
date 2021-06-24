const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const { productSchema } = require("./products");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "User id is required"],
    },
    name: {
      type: String,
      lowercase: true,
      unique: false,
      // Without this field being unique, Mongoose doesn't work for whatever reason
      type: String,
      default: uuidv4,
    },
    cartItems: [productSchema],
  },
  { collection: "cart" }
);

const Cart = mongoose.model("Cart", cartSchema);

exports.cartSchema = cartSchema;
exports.Cart = Cart;
