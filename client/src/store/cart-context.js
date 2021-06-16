import React from "react";

const CartContext = React.createContext({
  items: 0,
  addItemToCart: () => {},
});

export default CartContext;
