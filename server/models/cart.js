const mongoose = require("mongoose");

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
      default: 1,
    },
    cartItems: [productSchema],
  },
  { collection: "cart" }
);

const Cart = mongoose.model("Cart", cartSchema);

exports.cartSchema = cartSchema;
exports.Cart = Cart;
