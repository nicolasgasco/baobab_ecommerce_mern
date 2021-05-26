const morgan = require("morgan");

module.exports = function (app) {
  if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
    app.use(morgan("tiny"));
  }
};
