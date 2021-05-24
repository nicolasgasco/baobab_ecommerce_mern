const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const productSchemaJoi = Joi.object({
  completeName: {
    brand: Joi.string().uppercase().min(2).max(30).trim(),
    shortDesc: Joi.string().lowercase().min(2).max(25).trim(),
    productName: Joi.string().min(2).max(25).trim(),
    productDesc1: Joi.string().lowercase().min(2).max(50).trim(),
    productDesc2: Joi.string().lowercase().min(2).max(50).trim(),
    productDesc3: Joi.string().lowercase().min(2).max(50).trim(),
    productGender: Joi.string()
      .lowercase()
      .valid("unisex", "male", "female")
      .trim(),
  },
  creationDate: Joi.date().iso().default("now"),
  modificationDate: Joi.date().iso().less("now"),
  stock: Joi.number().min(0).max(9999),
  seller: Joi.string().min(2).max(30).trim(),
  department: Joi.objectId(),
  pricingInfo: {
    price: Joi.number().min(0.01).max(2000).precision(2),
    priceHistory: Joi.array().items(
      Joi.number().min(0.01).max(2000).precision(2)
    ),
  },
  ecoInfo: {
    originCountryCode: Joi.string()
      .uppercase()
      .trim()
      .pattern(/^[A-Z]{3}$/),
    productionCountryCode: Joi.string()
      .uppercase()
      .trim()
      .pattern(/^[A-Z]{3}$/),
    socialMission: Joi.string().trim().min(2).max(500),
    environmentMission: Joi.string().trim().min(2).max(500),
  },
});

module.exports = productSchemaJoi;
