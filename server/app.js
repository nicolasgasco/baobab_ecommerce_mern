const indexRouter = require("./routes/index");

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

// At the end, otherwise calling a route redirects you to home
app.use("/", indexRouter);

// Add here "page not found logic"
// app.use((req, res, next) => {
//   res.status(404);
// });

// Apparently I need this to make the deployment work
// app.use(function (req, res, next) {
//   res.setHeader(
//     "content-security-policy-report-only",
//     "default-src 'self'; script-src 'unsafe-inline' 'self' 'report-sample'; style-src 'self' 'report-sample'; base-uri 'none'; object-src 'none'; connect-src 'self'; font-src 'self'; frame-src 'self'; img-src 'self'; manifest-src 'self'; media-src 'self'; worker-src 'none'; report-uri https://5e52f4c893efcda6a7d40460.endpoint.csper.io"
//   );
//   next();
// });

// app.use(express.static(path.join(__dirname, "./build/")));

// Redirect all requests to index.html
// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "/build/index.html"), function (err) {
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// });

// console.log(path.join(__dirname, "/build/index.html"));

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

exports.app = app;
exports.server = server;
