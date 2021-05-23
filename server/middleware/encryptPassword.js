const bcrypt = require("bcrypt");

// Middle for password encryption
const encryptPasswordMiddle = (req, res, next) => {
  if (req.body.password) {
    let user = req.body;
    const saltRounds = process.env.SALT;
    user.password = bcrypt.hashSync(user.password, 10);
    req.body = user;
  }
  console.log("Password encrypted");
  next();
};

// Using actual function over middleware because I want to validate password before sending it database
const encryptPassword = (password) => {
  const saltRounds = process.env.SALT;
  return bcrypt.hashSync(password, +saltRounds);
};

module.exports.encryptPasswordMiddle = encryptPasswordMiddle;
module.exports.encryptPassword = encryptPassword;
