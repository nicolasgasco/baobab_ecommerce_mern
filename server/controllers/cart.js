const { Cart } = require("../models/cart");
const { Product } = require("../models/products");

const getCartItems = async (req, res) => {
  // Database request
  const userId = req.params.id;
  const cartCollection = await Cart.find({ userId });
  try {
    const cartItems = cartCollection[0].cartItems;

    if (cartItems.length === 0) {
      return res.status(404).send({ error: "Nothing found" });
    } else {
      res.send({
        resultsFound: cartItems.length,
        results: cartItems,
      });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// const addWholeCart = async (req, res) => {
//   try {
//     const userId = req.body.userId;
//     const cartCollection = req.body.cartCollection;

//     const newCartCollection = new Cart({ userId, cartItems: [cartItem] });
//     const result = await newCartCollection.save();
//     if (result) {
//       res.send({
//         insertedCount: 1,
//       });
//     } else {
//       throw new Error("Something went wrong");
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ error });
//   }
// };

const addCartItem = async (req, res) => {
  try {
    const userId = req.body.userId;
    const cartItem = req.body.cartItem;

    const cartCollection = await Cart.find({ userId });
    if (cartCollection.length === 0) {
      // No existing collection
      const newCartCollection = new Cart({ userId, cartItems: [cartItem] });
      const result = await newCartCollection.save();
      if (result) {
        res.send({
          existingCollection: false,
          insertedCount: 1,
        });
      } else {
        throw new Error("Something went wrong");
      }
    } else {
      const itemAlreadyFound = cartCollection[0].cartItems.filter((item) => {
        // Doesn't work with three equal signs
        return item._id == cartItem._id;
      });
      if (itemAlreadyFound.length === 0) {
        const update = await Cart.updateOne(
          { _id: cartCollection[0]._id },
          { $push: { cartItems: cartItem } }
        );
        if (update.nModified === 1) {
          res.send({
            existingCollection: true,
            insertedCount: 1,
          });
        } else {
          throw new Error("Something went wrong");
        }
      } else {
        res.status(400).send({
          existingCollection: true,
          insertedCount: 0,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const deleteCartItem = async (req, res) => {
  const userId = req.body.userId;
  const cartItemId = req.body.cartItemId;
  try {
    const cartCollection = await Cart.find({ userId });

    const update = await Cart.updateOne(
      { _id: cartCollection[0]._id },
      { $pull: { cartItems: { _id: cartItemId } } }
    );
    if (update.nModified === 1) {
      res.send({ deletedCount: 1 });
    } else {
      throw new Error("Item wasn't deleted");
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteWholeCart = async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await Cart.findOneAndDelete({ userId });
    if (result._id) {
      res.send({ deletedCount: 1, result: result });
    } else {
      throw new Error("Cart wasn't deleted");
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

exports.getCartItems = getCartItems;
exports.addCartItem = addCartItem;
exports.deleteCartItem = deleteCartItem;
exports.deleteWholeCart = deleteWholeCart;
// exports.addWholeCart = addWholeCart;
