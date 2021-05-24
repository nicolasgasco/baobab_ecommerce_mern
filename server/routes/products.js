const express = require("express");
const router = express.Router();

// Data validation with joi
const Joi = require("joi");
const productSchemaJoi = require("../joi/products");

const mongoose = require("mongoose");

// Initializing products
const productSchema = require("../models/products");
const Product = mongoose.model("Product", productSchema);

// GET all products
router.get("/", async (req, res) => {
  if (!res) {
    res.status(500).send("Error");
  }

  try {
    // Populating department name from another table, with name and without id
    const products = await Product.find().populate("department", "name -_id");
    res.send({
      resultsFound: products.length,
      results: products,
    });
  } catch (err) {
    console.log("Error: " + err.message);
    res.status(400).send({ error: err.message });
  }
});

// POST a new product
router.post("/", async (req, res) => {
  if (!res) {
    res.status(500).send("Error");
  }
  // First round of validation with Joi
  const joiValidation = productSchemaJoi.validate(req.body);
  if (joiValidation.error) {
    res.status(400).send({
      error: `${
        joiValidation.error.name
      } (Joi): ${joiValidation.error.details.map((err) => {
        return err.message;
      })}`,
    });
    return;
  }
  console.log("Joi validation successful");

  // Creating new mongoose product with body
  const product = new Product(req.body);
  try {
    // Second round of validation with Mongoose
    await product.validate();
    console.log("Mongoose validation successful");

    // Saving in DB and sending result
    const result = await product.save();
    res.send({ insertedCount: 1, result: result });
  } catch (err) {
    const errMessages = [];
    for (field in err.errors) {
      console.log(
        `Error: ${err.errors[field].path}: ${err.errors[field].message}`
      );
      errMessages.push(
        `Error: ${err.errors[field].path}: ${err.errors[field].message}`
      );
    }

    res.status(400).send({
      error: errMessages,
    });
  }
});

// PUT a specific product (with ID)
router.put("/:id", async (req, res) => {
  if (!res) {
    res.status(500).send("Error");
  }

  // Add a modification date
  req.body.modificationDate = new Date();

  // First round of validation with Joi
  const joiValidation = productSchemaJoi.validate(req.body);
  if (joiValidation.error) {
    res.status(400).send({
      error: `${
        joiValidation.error.name
      } (Joi): ${joiValidation.error.details.map((err) => {
        return err.message;
      })}`,
    });
    return;
  }
  console.log("Joi validation successful");

  const updatedProduct = new Product(req.body);
  try {
    // Validation with Mongoose
    await updatedProduct.validate();

    // Finding and updating at the same time
    const result = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!result) {
      throw err;
    }
    res.send({ updatedCount: 1, updatedObj: result });
  } catch (err) {
    const errMessages = [];
    for (field in err.errors) {
      console.log(`Error: ${err.errors[field].message}`);
      errMessages.push(err.errors[field].message);
    }

    res.status(400).send({
      error: errMessages,
    });
  }
});

// // DELETE a specific user (with ID)
// router.delete("/:id", async (req, res) => {
//   try {
//     const result = await User.remove({ _id: req.params.id });
//     if (result.deletedCount === 0) {
//       throw new Error("User not found");
//     }
//     res.send({ deletedCount: 1, result: result });
//   } catch (err) {
//     console.log("Error: ", err.message);
//     res.status(400).send({
//       deletedCount: 0,
//       error: err.message,
//     });
//   }
// });

module.exports = router;
