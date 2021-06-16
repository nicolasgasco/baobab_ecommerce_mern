import { useState } from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const [items, setItems] = useState(0);

  const addItemToCart = () => {
    console.log("ciao");
    setItems((prevState) => {
      console.log(prevState);
      setItems(prevState + 1);
    });
  };

  const cartContext = {
    items,
    addItemToCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
