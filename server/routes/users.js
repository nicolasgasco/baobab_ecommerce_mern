const express = require("express");
const router = express.Router();
const { encryptPassword } = require("../middleware/encryptPassword");

// Data validation with joi
const Joi = require("joi");
const userSchemaJoi = require("../joi/users");

const mongoose = require("mongoose");

// Initializing users
const userSchema = require("../models/users");
const User = mongoose.model("User", userSchema);

// GET all users
router.get("/", async (req, res) => {
  try {
    // Query param for sorting, by which and in which order
    let sortBy = req.query.sortBy;
    const order = req.query.order;

    // You can add a - in front of key for descending order
    sortBy = order === "-1" ? "-" + sortBy : sortBy;

    // Dictionary request
    const users = await User.find().sort(sortBy);
    res.send({
      resultsFound: users.length,
      sortBy: () => {
        return sortBy ? sortBy.replace("-", "") : null;
      },
      order,
      results: users,
    });
  } catch (err) {
    console.log("Error: " + err.message);
    res.status(400).send({ error: err.message });
  }
});

// POST a new user
router.post("/", async (req, res) => {
  // First round of validation with Joi
  const joiValidation = userSchemaJoi.validate(req.body);
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

  // Encrypt password now and not before, otherwise it cannot be validated
  req.body.password = encryptPassword(req.body.password);

  // Creating new mongoose user with body
  const user = new User(req.body);
  try {
    // Second round of validation with Mongoose
    await user.validate();
    console.log("Mongoose validation successful");

    // Saving in DB and sending result
    const result = await user.save();
    res.send({ insertedCount: 1, result: result });
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

// PUT a specific user (with ID)
router.put("/:id", async (req, res) => {
  // Add a modification date
  req.body.modificationDate = new Date();

  // First round of validation with Joi
  const joiValidation = userSchemaJoi.validate(req.body);
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

  const updatedUser = new User(req.body);
  try {
    // Validation with Mongoose
    await updatedUser.validate();

    req.body.password = updatedUser.password
      ? encryptPassword(req.body.password)
      : null;
    // Finding and updating at the same time
    const result = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!result) {
      throw err;
    }
    res.send({ updatedCount: 1, updatedObj: result });
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

// DELETE a specific user (with ID)
router.delete("/:id", async (req, res) => {
  try {
    const result = await User.remove({ _id: req.params.id });
    if (result.deletedCount === 0) {
      throw new Error("User not found");
    }
    res.send({ deletedCount: 1, result: result });
  } catch (err) {
    console.log("Error: ", err.message);
    res.status(400).send({
      deletedCount: 0,
      error: err.message,
    });
  }
});

module.exports = router;
