const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchemaJoi = Joi.object({
  name: Joi.string().min(2).max(25).trim().required(),
  surname: Joi.string().min(2).max(25).trim().required(),
  password: passwordComplexity().required(),
  email: Joi.when("modificationDate", {
    is: null,
    then: Joi.optional(),
    otherwise: Joi.string().lowercase().email().required(),
  }),
  gender: Joi.string().valid("f", "m", "o").trim().required(),
  // birthday: Joi.date()
  //   .max(
  //     `${new Date().getMonth() + 1}-${new Date().getDate()}-${
  //       new Date().getFullYear() - 18
  //     }`
  //   )
  //   .min(
  //     `${new Date().getMonth() + 1}-${new Date().getDate()}-${
  //       new Date().getFullYear() - 125
  //     }`
  //   )
  //   .required(),
  creationDate: Joi.date().iso().default("now"),
  modificationDate: Joi.date().iso().less("now"),
  address: {
    countryCode: Joi.string()
      .pattern(new RegExp("^[A-Z]{3}$"))
      .uppercase()
      .trim()
      .required(),
    region: Joi.string().trim().min(2).max(25).required(),
    province: Joi.string().trim().min(2).max(25).required(),
    city: Joi.string().trim().min(2).max(25).required(),
    zip: Joi.string().trim().length(5).regex(/^\d+$/).required(),
    street: Joi.string().trim().min(1).max(50).required(),
    // streetNumber: Joi.string().trim().min(1).max(10).required(),
    // doorNumber: Joi.string().trim().min(1).max(10).required(),
    other: Joi.string().trim().min(2).max(50),
  },
  telephone: {
    countryPrefix: Joi.string()
      .trim()
      .min(2)
      .max(4)
      .pattern(new RegExp("^\\+[0-9]{1,6}$"))
      .required(),
    number: Joi.string()
      .trim()
      .min(4)
      .max(15)
      .pattern(new RegExp("^[0-9]*$"))
      .required(),
  },
  // tier: Joi.number().valid(0, 1).required(),
});

module.exports = userSchemaJoi;
