const helmet = require("helmet");
const compression = require("compression");

module.exports = function (app) {
  app.use(helmete());
  app.use(compression());
};
