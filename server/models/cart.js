const mongoose = require("mongoose");

const { productSchema } = require("./products");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      lowercase: true,
      required: [true, "User id is required"],
    },
    cartItems: [productSchema],
  },
  { collection: "cart" }
);

const Cart = mongoose.model("Cart", cartSchema);

exports.cartSchema = cartSchema;
exports.Cart = Cart;
