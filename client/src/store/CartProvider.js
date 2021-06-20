import { useEffect, useState } from "react";
import CartContext from "./cart-context";

import jwt_decode from "jwt-decode";

const CartProvider = (props) => {
  const [totalPrice, setTotalPrice] = useState(0);
  // It starts empty and then fetched
  const [items, setItems] = useState([]);
  const [lastOrder, setLastOrder] = useState({});
  const [userAddress, setUserAddress] = useState({});

  const fetchCartFromDB = async () => {
    // Fetching from DB if user is logged
    console.log("fetchin items");
    if (localStorage.getItem("token")) {
      const userId = jwt_decode(localStorage.getItem("token"))._id;
      const fetchResponse = await fetch(`/api/cart/${userId}`);
      const allCartItems = await fetchResponse.json();
      if (allCartItems.results) {
        console.log("items fetched");
        setItems(allCartItems.results);
      } else {
        console.log("items empty");
        setItems([]);
      }
      // Fetching from localStorage if user not logged
    } else if (localStorage.getItem("cart")) {
      setItems(JSON.parse(localStorage.getItem("cart")));
    }
  };

  // Fetching cart from DB at the beginning
  useEffect(() => {
    // Only if user is logged
    if (localStorage.getItem("token")) fetchCartFromDB();
  }, []);

  const addItemToCart = async (item) => {
    // Adding quantity propierty to item
    item.quantity = 1;
    // If user is logged
    if (localStorage.getItem("token")) {
      try {
        console.log("posting cart");
        console.log("merda", item);
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
          setItems([...prevState, item]);
        });
      } catch (err) {
        console.log(err.message);
      }
      // If user not logged
    } else {
      if (localStorage.getItem("cart")) {
        const allLocalItems = JSON.parse(localStorage.getItem("cart"));
        if (
          allLocalItems.filter((object) => object._id == item._id).length === 0
        ) {
          allLocalItems.push(item);
        }
        console.log(allLocalItems);
        localStorage.setItem("cart", JSON.stringify(allLocalItems));
      } else {
        localStorage.setItem("cart", JSON.stringify([item]));
      }
      setItems((prevState) => {
        setItems([...prevState, item]);
      });
    }
  };

  useEffect(() => {
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
    // If user is logged in
    if (localStorage.getItem("token")) {
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
          console.log("item deleted");
          // Deleted
          setItems((prevState) => {
            if (prevState.length === 1) {
              setItems([]);
            } else {
              setItems(
                prevState.filter((item) => {
                  return item._id !== id;
                })
              );
            }
          });
        } else {
          throw new Error("Item wasn't deleted");
        }
      } catch (err) {
        console.log(err.message);
      }
    } else if (localStorage.getItem("cart")) {
      const allItems = JSON.parse(localStorage.getItem("cart"));
      const newItems = allItems.filter((object) => object._id !== id);
      localStorage.setItem("cart", JSON.stringify(newItems));
      setItems((prevState) => {
        if (prevState.length === 1) {
          setItems([]);
        } else {
          setItems(
            prevState.filter((item) => {
              return item._id !== id;
            })
          );
        }
      });
    }
  };

  const deleteCartLocal = () => {
    console.log("Delete all");
    setItems([]);
  };

  const saveOrder = async (id, items) => {
    try {
      const fetchResponse = await fetch(`/api/order/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items, userAddress }),
      });
      const order = await fetchResponse.json();
      deleteUserCart(id);
      setLastOrder(order.result);
      console.log("Order saved");
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteUserCart = async (id) => {
    console.log("Deleting user cart");
    try {
      const fetchResponse = await fetch(`/api/cart/whole/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const deletedCart = await fetchResponse.json();
      if (deletedCart.deletedCount) {
        console.log("Cart deleted");
        deleteCartLocal();
      } else {
        throw new Error("It wasn't possible to delete the cart");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const cartContext = {
    items,
    totalPrice,
    lastOrder,
    userAddress,
    setUserAddress,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    deleteCartLocal,
    fetchCartFromDB,
    saveOrder,
    deleteUserCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
