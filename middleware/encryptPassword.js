const bcrypt = require("bcryptjs");

// Using actual function over middleware because I want to validate password before sending it database
const encryptPassword = (password) => {
  const saltRounds = process.env.SALT;
  return bcrypt.hashSync(password, +saltRounds);
};

module.exports.encryptPassword = encryptPassword;
