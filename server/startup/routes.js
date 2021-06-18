const express = require("express");
const path = require("path");

// External routes from routes folder
const usersRouter = require("../routes/users");
const departmentsRouter = require("../routes/departments");
const productsRouter = require("../routes/products");
const cartRouter = require("../routes/cart");
const ordersRouter = require("../routes/orders");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "build")));

  // Used to redirect to react page when a route other than index is refreshed by user
  app.use("/api/departments", departmentsRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/products", productsRouter);
  app.use("/api/cart", cartRouter);
  app.use("/api/order", ordersRouter);
};
