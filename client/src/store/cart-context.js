import React from "react";

const CartContext = React.createContext({
  items: [],
  totalPrice: 0,
  operationsDone: false,
  addItemToCart: (item) => {},
  removeItemFromCart: (id) => {},
  updateItemQuantity: (id, quantity) => {},
  deleteCartLocal: () => {},
  fetchCartFromDB: () => {},
});

export default CartContext;
