const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  surname: { type: String, required: [true, "Surname is required"] },
  gender: String,
  birthday: Date,
  userSince: { type: Date, default: Date.now },
  address: Object,
  telephone: Object,
  tier: Number,
});

module.exports = userSchema;