const bcrypt = require('bcrypt');

// MIddleware for password encryption
const encryptPassword = (req, res, next) => {
  if (req.body.password) {
    let user = req.body;
    const saltRounds = process.env.SALT;
    user.password = bcrypt.hashSync(user.password, 10);
    req.body = user;
  }
  console.log('Password encrypted');
  next();
};

module.exports = encryptPassword;
