import { useEffect, useState } from "react";
import CartContext from "./cart-context";

import jwt_decode from "jwt-decode";

const CartProvider = (props) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [operationsDone, setOperationsDone] = useState(false);
  const [items, setItems] = useState(async () => {
    console.log("fetchin items");
    if (localStorage.getItem("token")) {
      const userId = jwt_decode(localStorage.getItem("token"))._id;
      console.log(userId, "userID");
      const fetchResponse = await fetch(`/api/cart/${userId}`);
      const allCartItems = await fetchResponse.json();
      if (allCartItems.results) {
        return allCartItems.results;
      } else {
        return [];
      }
    }
    return [];
  });

  const fetchCartFromDB = async () => {
    console.log("fetchin items");
    if (localStorage.getItem("token")) {
      const userId = jwt_decode(localStorage.getItem("token"))._id;
      console.log(userId, "userID");
      const fetchResponse = await fetch(`/api/cart/${userId}`);
      const allCartItems = await fetchResponse.json();
      console.log(typeof allCartItems.results, "CIAAA");
      setItems(allCartItems.results);
    }
  };

  const addItemToCart = async (item) => {
    try {
      console.log("posting cart");
      item.quantity = 1;
      const fetchResponse = await fetch("/api/cart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: jwt_decode(localStorage.getItem("token"))._id,
          cartItem: item,
        }),
      });
      const data = await fetchResponse.json();
      console.log("data", data);
      if (data.insertedCount === 1) {
        // Good
      } else {
        throw new Error("Something went wrong");
      }

      // Doing this locally too
      setItems((prevState) => {
        item.quantity = 1;
        setItems([...prevState, item]);
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    console.log(items);
    if (items.length > 0) {
      const totalPrice = items.reduce((accumulator, currentValue) => {
        return (
          accumulator + currentValue.pricingInfo.price * currentValue.quantity
        );
      }, 0);

      // Get total price
      setTotalPrice(totalPrice);
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
          prevState +
            newProducts[updatedItemIndex].pricingInfo.price *
              newProducts[updatedItemIndex].quantity
        );
      });
    });
  };

  const removeItemFromCart = async (id) => {
    setOperationsDone(false);
    try {
      const userId = jwt_decode(localStorage.getItem("token"))._id;
      console.log("deleting cart");
      const fetchResponse = await fetch("/api/cart/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          cartItemId: id,
        }),
      });
      const data = await fetchResponse.json();
      if (data.deletedCount === 1) {
        // Deleted
        setItems((prevState) => {
          setItems(
            prevState.filter((item) => {
              return item._id !== id;
            })
          );
        });
        setOperationsDone(true);
      } else {
        throw new Error("Item wasn't deleted");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteCartLocal = () => {
    console.log("Delete all");
    setItems([]);
  };

  const cartContext = {
    items,
    totalPrice,
    operationsDone,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    deleteCartLocal,
    fetchCartFromDB,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
