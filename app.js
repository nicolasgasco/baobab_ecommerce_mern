const express = require("express");

const path = require("path");

// Handle all err messages instead of using try/catch blocks
require("express-async-errors");

// Calling variuos app.use in separate file
const app = express();

// Includes dotenv and Morgan
require("./startup/config")(app);
// Include connection to database
require("./startup/db")();
// Joi validation
require("./startup/validation")();
// Helmet and compress
require("./startup/prod")(app);
// Includes unhandled rejections and uncaught exceptions
require("./startup/logging")();
// Routes
require("./startup/routes")(app);
// Complete passport auth logic
require("./startup/auth")(app);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //*Set static folder up in production
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const port = process.env.PORT || 8000;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);
console.log(`We are currently in ${process.env.NODE_ENV}...`);

exports.app = app;
exports.server = server;
