import { useEffect, useState } from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addItemToCart = (item) => {
    setItems((prevState) => {
      item.quantity = 1;
      setItems([...prevState, item]);
    });
  };

  useEffect(() => {
    if (items.length > 0) {
      // Get total price
      setTotalPrice(
        items.reduce(
          (a, b) =>
            +a.quantity * a.pricingInfo.price +
            +b.quantity * b.pricingInfo.price
        )
      );
    }
  }, [items]);

  const updateItemQuantity = (id, quantity) => {
    console.log(id, quantity, "ciao");
    setItems((prevState) => {
      const newProducts = [...prevState];
      const updatedItemIndex = newProducts.findIndex((item) => {
        return item._id === id;
      });
      newProducts[updatedItemIndex].quantity = quantity;
      setItems(newProducts);
      //   Updating total price
      setTotalPrice((prevState) => {
        setTotalPrice(
          prevState + newProducts[updatedItemIndex].pricingInfo.price * newProducts[updatedItemIndex].quantity
        );
      });
    });
  };

  const removeItemFromCart = (id) => {
    setItems((prevState) => {
      setItems(
        prevState.filter((item) => {
          return item._id !== id;
        })
      );
    });
  };

  const cartContext = {
    items,
    totalPrice,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
