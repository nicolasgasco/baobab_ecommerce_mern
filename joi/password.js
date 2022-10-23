const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const passwordSchemaJoi = Joi.object({
  password: passwordComplexity().required(),
});

module.exports = passwordSchemaJoi;
