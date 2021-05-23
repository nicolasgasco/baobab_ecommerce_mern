const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchemaJoi = Joi.object({
  name: Joi.string().min(2).max(25).required().trim(),
  surname: Joi.string().min(2).max(25).required().trim(),
  password: passwordComplexity().required().trim(),
  email: Joi.when("modificationDate", {
    is: null,
    then: Joi.optional(),
    otherwise: Joi.string().email(),
  }),
  gender: Joi.string().valid("f", "m", "o").required().trim(),
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
    .required(),
  creationDate: Joi.date(),
  modificationDate: Joi.date(),
  address: {
    countryCode: Joi.string()
      .pattern(new RegExp("^[A-Z]{3}$"))
      .uppercase()
      .trim(),
    region: Joi.string().trim().min(2).max(25),
    province: Joi.string().trim().min(2).max(25),
    city: Joi.string().trim().min(2).max(25),
    zip: Joi.string().trim().length(5),
    street: Joi.string().trim().min(1).max(25),
    streetNumber: Joi.string().trim().min(2).max(25),
    doorNumber: Joi.string().trim().min(2).max(10),
    other: Joi.string().trim().min(2).max(50),
  },
  telephone: {
    countryPrefix: Joi.string()
      .trim()
      .min(3)
      .max(3)
      .pattern(new RegExp("^\\+[0-9]{1,6}$")),
    number: Joi.string().trim().max(15).pattern(new RegExp("^[0-9]*$")),
  },
  tier: Joi.number().valid(0, 1, 2),
});

module.exports = userSchemaJoi;
