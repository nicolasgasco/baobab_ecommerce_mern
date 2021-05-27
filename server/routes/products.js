const express = require("express");
const router = express.Router();

// Data validation with joi
const Joi = require("joi");
const productSchemaJoi = require("../joi/products");
const asyncMiddleware = require("../middleware/async");

const mongoose = require("mongoose");

// Initializing products
const productSchema = require("../models/products");
const Product = mongoose.model("Product", productSchema);

// GET all products
router.get("/", async (req, res) => {
  if (!res) {
    res.status(500).send("Error");
  }

  const pageNumber = req.query.pageNum;
  const pageSize = req.query.pageSize;

  // Populating department name from another table, with name and without id
  const products = await Product.find()
    .populate("department", "name -_id")
    .skip((pageNumber - 1) * pageSize)
    .limit(+pageSize);

  if (products.length === 0) {
    res.status(400).send({ error: "No results found" });
  }

  res.send({
    resultsFound: products.length,
    pageNumber,
    pageSize,
    results: products,
  });
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
  // Second round of validation with Mongoose
  await product.validate();
  console.log("Mongoose validation successful");

  // Saving in DB and sending result
  const result = await product.save();
  res.send({ insertedCount: 1, result: result });
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
});

// DELETE a specific order (with ID)
router.delete("/:id", async (req, res) => {
  if (!res) {
    res.status(500).send("Error");
  }

  const result = await Product.remove({ _id: req.params.id });
  if (result.deletedCount === 0) {
    res.status(404).send("Product not found");
  }
  res.send({ deletedCount: 1, result: result });
});

module.exports = router;
