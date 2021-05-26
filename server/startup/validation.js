module.exports = (Joi) => {
  Joi.objectId = require("joi-objectid")(Joi);
};
