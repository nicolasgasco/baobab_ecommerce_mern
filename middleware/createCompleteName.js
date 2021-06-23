module.exports = (req, res, next) => {
  if (req.body.completeName) {
    req.body.completeNameDesc = Object.values(req.body.completeName)
      .map((word) => {
        return word.toLowerCase();
      })
      .join(" ");
  }
  next();
};
