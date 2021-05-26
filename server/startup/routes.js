const express = require("express");
const path = require("path");
const helmet = require("helmet");
// const error = require("../middleware/error");

// External routes from routes folder
const usersRouter = require("../routes/users");
const departmentsRouter = require("../routes/departments");
const productsRouter = require("../routes/products");

// Handle all err messages instead of using try/catch blocks
require("express-async-errors");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "build")));

  // Helmet for security
  app.use(helmet());

  // Used to redirect to react page when a route other than index is refreshed by user
  app.use("/api/users", usersRouter);
  app.use("/api/departments", departmentsRouter);
  app.use("/api/products", productsRouter);
};
