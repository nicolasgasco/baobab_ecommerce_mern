const productSchemaJoi = require("../joi/products");

module.exports = (req, res, next) => {
  const joiValidation = productSchemaJoi.validate(req.body);
  if (joiValidation.error) {
    res.status(400).send({
      error: `${
        joiValidation.error.name
      } (Joi): ${joiValidation.error.details.map((err) => {
        return err.message;
      })}`,
    });
    return;
  }
  next();
};
