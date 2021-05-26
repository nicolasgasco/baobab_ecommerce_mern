module.exports = function (Joi) {
  Joi.objectId = require("joi-objectid")(Joi);
};
