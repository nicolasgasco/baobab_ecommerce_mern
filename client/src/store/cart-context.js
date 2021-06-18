import React from "react";

const CartContext = React.createContext({
  items: [],
  totalPrice: 0,
  lastOrder: {},
  addItemToCart: (item) => {},
  removeItemFromCart: (id) => {},
  updateItemQuantity: (id, quantity) => {},
  deleteCartLocal: () => {},
  fetchCartFromDB: () => {},
  saveOrder: (id, items) => {},
  deleteUserCart: (id) => {},
});

export default CartContext;
