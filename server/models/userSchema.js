const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [2, "Name too short"],
    maxLength: 25,
    trim: true,
    required: [true, "Name is required"],
  },
  surname: {
    type: String,
    minLength: [2, "Surname too short"],
    maxLength: 25,
    trim: true,
    required: [true, "Surname is required"],
  },
  password: {
    type: String,
    minLength: [8, "Password too short"],
    maxLength: 25,
    trim: true,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    minLength: [3, "Email too short"],
    maxLength: 320,
    required: [true, "Email is required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email is not valid",
    ],
  },
  gender: {
    type: String,
    lowercase: true,
    trim: true,
    enum: ["m", "f", "o"],
    required: [true, "Gender is required (m, f, o)"],
  },
  birthday: Date,
  userSince: { type: Date, default: Date.now },
  address: {
    country: String,
    region: String,
    province: String,
    city: String,
    zip: String,
    street: String,
    streetNumber: String,
    doorNumber: String,
    other: String,
  },
  telephone: {
    countryPrefix: {
      type: String,
      trim: true,
      match: [
        /^\\+(?:[0-9] ?){6,14}[0-9]$/,
        "Prefix is not valid",
      ]
    },
    number: {type: String, trim: true, match: [/^[0-9]*$/, "Phone number must contain only digits"]
  },
  tier: {
    type: Number,
    default: 0,
    enum: [0, 1, 2],
  },
});

module.exports = userSchema;
