const indexRouter = require("./routes/index");

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");

const Joi = require("joi");

// Calling variuos app.use in separate file
const app = express();

// Handle all err messages instead of using try/catch blocks
require("express-async-errors");
// Includes unhandled rejections and uncaught exceptions
require("./startup/logging")();
// Includes dotenv and Morgan
require("./startup/config")(app);
// Include connection to database
require("./startup/db")(mongoose);
// ObjectId for Joi
require("./startup/validation")(Joi);
// Includes helmet, path, and express async errors
require("./startup/routes")(app);
// Complete passport auth logic
require("./startup/auth")(app, passport, session, mongoose);

// At the end, otherwise calling a route redirects you to home
app.use("/", indexRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
