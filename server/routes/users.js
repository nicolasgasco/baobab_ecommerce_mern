const express = require("express");
const router = express.Router();
const Joi = require("joi");
const userSchemaJoi = require("../joi/users_validation");

const mongoose = require("mongoose");
const userSchema = require("../mongoose/crud_users");
const User = mongoose.model("User", userSchema);

/* GET users listing. */
router.get("/", async (req, res) => {
  try {
    // Query param for sorting
    let sortBy = req.query.sortBy;
    const order = req.query.order;
    // Sorting in descending order
    if (order < 0) {
      sortBy = "-" + sortBy;
    }
    const users = await User.find().sort(sortBy);
    res.send({
      resultsFound: users.length,
      sortBy: sortBy.replace("-", ""),
      order,
      results: users,
    });
  } catch (err) {
    console.log("Error: " + err);
    res.status(400);
  }
});

router.post("/", async (req, res) => {

  const joiValidation = userSchemaJoi.validate(req.body);
  if (joiValidation.error) {
    res.status(400).send({
      error: `${joiValidation.error.name}: ${joiValidation.error.details.map((err) => {
        return err.message;
      })}`,
    });
    return;
  }
  console.log("Joi validation successful");

  const user = new User(req.body);
  try {
    await user.validate();
    console.log("Mongoose validation successful");
    const result = await user.save();
    res.send(result);
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

router.put("/:id", async (req, res) => {
  try {
    const updatedUser = new User(req.body);
    await updatedUser.validate();

    req.body.modificationDate = new Date();
    const result = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!result) {
      throw err;
    }
    res.send({ updatedCount: 1, updatedObj: result });
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

module.exports = router;
