const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const productSchemaJoi = Joi.object({
  completeName: {
    brand: Joi.string().uppercase().min(2).max(30).trim().required(),
    shortDesc: Joi.string().lowercase().min(2).max(25).trim().required(),
    productName: Joi.string().min(2).max(25).trim().required(),
    productDesc1: Joi.string().lowercase().min(2).max(50).trim().required(),
    productDesc2: Joi.string().lowercase().min(2).max(50).trim().required(),
    productDesc3: Joi.string().lowercase().min(2).max(50).trim().required(),
    productGender: Joi.string()
      .lowercase()
      .valid("unisex", "male", "female")
      .trim()
      .required(),
  },
  productId: Joi.string().guid(),
  creationDate: Joi.date().iso().default("now"),
  modificationDate: Joi.date().iso().less("now"),
  stock: Joi.number().min(0).max(9999),
  seller: Joi.string().min(2).max(30).trim(),
  department: Joi.objectId().required(),
  pricingInfo: {
    price: Joi.number().min(0.01).max(2000).precision(2).required(),
    priceHistory: Joi.array().items(
      Joi.number().min(0.01).max(2000).precision(2)
    ),
  },
  ecoInfo: {
    originCountryCode: Joi.string()
      .uppercase()
      .trim()
      .pattern(/^[A-Z]{3}$/)
      .required(),
    productionCountryCode: Joi.string()
      .uppercase()
      .trim()
      .pattern(/^[A-Z]{3}$/)
      .required(),
    socialMission: Joi.string().trim().min(2).max(500).required(),
    environmentMission: Joi.string().trim().min(2).max(500).required(),
  },
});

module.exports = productSchemaJoi;
