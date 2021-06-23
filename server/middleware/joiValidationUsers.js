const userSchemaJoi = require("../joi/users");

module.exports = (req, res, next) => {
  const joiValidation = userSchemaJoi.validate(req.body);
  if (joiValidation.error) {
    res.status(400).send({
      error: `${
        joiValidation.error.name
      } (Joi): ${joiValidation.error.details.map((err) => {
        return ` "${err.message[1].toUpperCase()}${err.message.slice(2)}`;
      })}`,
    });
    return;
  }
  next();
};
