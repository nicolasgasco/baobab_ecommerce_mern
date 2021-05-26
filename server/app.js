const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");

const Joi = require("joi");

// Calling variuos app.use in separate file
const app = express();
// Includes unhandled rejections and uncaught exceptions
require("./startup/logging")();
// Includes dotenv and Morgan
require("./startup/config")(app);
// Include connection to database
require("./startup/db")(mongoose);
// Includes helmet, path, and express async errors
require("./startup/routes")(app);
// ObjectId ofr Joi
require("./startup/validation")(Joi);
// Complete passport auth logic
require("./startup/auth")(app, passport, session, mongoose);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
