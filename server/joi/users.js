const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchemaJoi = Joi.object({
  name: Joi.string().min(2).max(25).trim(),
  surname: Joi.string().min(2).max(25).trim(),
  password: passwordComplexity().trim(),
  email: Joi.when("modificationDate", {
    is: null,
    then: Joi.optional(),
    otherwise: Joi.string().lowercase().email(),
  }),
  gender: Joi.string().valid("f", "m", "o").trim(),
  birthday: Joi.date()
    .max(
      `${new Date().getMonth() + 1}-${new Date().getDate()}-${
        new Date().getFullYear() - 18
      }`
    )
    .min(
      `${new Date().getMonth() + 1}-${new Date().getDate()}-${
        new Date().getFullYear() - 125
      }`
    )
    ,
  creationDate: Joi.date().iso().default("now"),
  modificationDate: Joi.date().iso().less("now"),
  address: {
    countryCode: Joi.string()
      .pattern(new RegExp("^[A-Z]{3}$"))
      .uppercase()
      .trim(),
    region: Joi.string().trim().min(2).max(25),
    province: Joi.string().trim().min(2).max(25),
    city: Joi.string().trim().min(2).max(25),
    zip: Joi.string().trim().length(5).regex(/^\d+$/),
    street: Joi.string().trim().min(1).max(25),
    streetNumber: Joi.string().trim().min(1).max(10),
    doorNumber: Joi.string().trim().min(1).max(10),
    other: Joi.string().trim().min(2).max(50),
  },
  telephone: {
    countryPrefix: Joi.string()
      .trim()
      .min(2)
      .max(4)
      .pattern(new RegExp("^\\+[0-9]{1,6}$")),
    number: Joi.string().trim().min(4).max(15).pattern(new RegExp("^[0-9]*$")),
  },
  tier: Joi.number().valid(0, 1),
});

module.exports = userSchemaJoi;
