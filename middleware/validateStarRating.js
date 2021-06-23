module.exports = (req, res, next) => {
  if (!req.body.rating) {
    return res.status(400).send({ error: "Provide a rating" });
  }
  if (!Number.isInteger(req.body.rating))
    return res.status(400).send({ error: "Invalid rating" });
  next();
};
