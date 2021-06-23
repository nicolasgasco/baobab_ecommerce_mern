const mongoose = require("mongoose");

module.exports = (req, res, next) => {
  if (!req.params.id) res.status(400).send({ error: "Id missing" });
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send({ error: "Invalid ObjectId" });
  next();
};
