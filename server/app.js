const indexRouter = require("./routes/index");

const express = require("express");
// Calling variuos app.use in separate file
const app = express();


// Includes dotenv and Morgan
require("./startup/config")(app);
// Include connection to database
require("./startup/db")();
// Joi validation
require("./startup/validation")();
// Handle all err messages instead of using try/catch blocks
require("express-async-errors");
// Helmet and compress
require("./startup/prod")(app);
// Includes unhandled rejections and uncaught exceptions
require("./startup/logging")();
// Routes
require("./startup/routes")(app);
// Complete passport auth logic
require("./startup/auth")(app);

// At the end, otherwise calling a route redirects you to home
app.use("/", indexRouter);

// Add here "page not found logic"
// app.use((req, res, next) => {
//   res.status(404);
// });

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

exports.app = app;
exports.server = server;
