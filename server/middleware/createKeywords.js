const encryptPassword = (password) => {
  const saltRounds = process.env.SALT;
  return bcrypt.hashSync(password, +saltRounds);
};

module.exports = (req, res, next) => {
  // Creating list of lowercase words
  const keywordsList = req.body.keywords
    .split(" ")
    .filter((word) => {
      return /[A-Za-z0-9]+/.test(word);
    })
    .map((word) => {
      return word.toLowerCase();
    });

  req.body.keywords = keywordsList.join("|");
  next();
};
