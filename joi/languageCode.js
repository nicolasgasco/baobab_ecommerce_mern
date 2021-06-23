const Joi = require("joi");

const languageCodeJoi = Joi.string()
  .lowercase()
  .min(5)
  .max(5)
  .trim()
  .pattern(/^[a]{2}\_[a]{2}$/).valid("es_es", "en_us");

module.exports = languageCodeJoi;
