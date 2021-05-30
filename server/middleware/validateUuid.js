const { validate: uuidValidate } = require("uuid");
module.exports = (req, res, next) => {
  if (!uuidValidate(req.params.id))
    return res.status(400).send({ error: "Invalid ID" });
  next();
};
