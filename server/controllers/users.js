// Initializing users
const { User } = require("../models/users");

// Data validation with joi
const Joi = require("joi");
const userSchemaJoi = require("../joi/users");

const { encryptPassword } = require("../middleware/encryptPassword");

const getAllUsers = async (req, res) => {
  // Query param for sorting, by which and in which order
  let sortBy = req.query.sortBy;
  const order = req.query.order;

  // You can add a - in front of key for descending order
  sortBy = order === "-1" ? "-" + sortBy : sortBy;

  // Database request
  const users = await User.find().sort(sortBy);

  if (users.length === 0) res.status(404).send({ error: "Nothing found" });
  
  sortBy = sortBy ? sortBy.replace("-", "") : null;
  res.send({
    resultsFound: users.length,
    sortBy: sortBy ? sortBy.replace("-", "") : undefined,
    order: (order === "1" || order === "-1") ? order : undefined,
    results: users,
  });
};

const postNewUser = async (req, res) => {
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

  // Second round of validation with Mongoose
  await user.validate();
  console.log("Mongoose validation successful");

  // Saving in DB and sending result
  const result = await user.save();
  res.send({ insertedCount: 1, result: result });
};

const putUserWithId = async (req, res) => {
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
};

const deleteUser = async (req, res) => {
  const result = await User.remove({ _id: req.params.id });
  if (result.deletedCount === 0) {
    res.status(404).send("Product not found");
  }
  res.send({ deletedCount: 1, result: result });
};

exports.getAllUsers = getAllUsers;
exports.postNewUser = postNewUser;
exports.putUserWithId = putUserWithId;
exports.deleteUser = deleteUser;
