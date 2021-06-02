const mongoose = require("mongoose");
const fetch = require("node-fetch");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [2, "Name too short"],
      maxLength: [25, "Name too long"],
      trim: true,
      required: [true, "Name is required"],
    },
    surname: {
      type: String,
      minLength: [2, "Surname too short"],
      maxLength: [25, "Surname too long"],
      trim: true,
      required: [true, "Surname is required"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      minLength: [3, "Email too short"],
      maxLength: [320, "Email too long"],
      // Email is required only when inserting new user, not when updating
      required: [
        function () {
          return this.modificationDate === null ? true : false;
        },
        "Email is required",
      ],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email format is not valid",
      ],
      validate: {
        // Calling API to see if email already exists
        validator: async function (value) {
          try {
            const User = mongoose.model("User", userSchema);
            const userCount = await User.find({
              email: this.email,
            }).countDocuments();
            return !userCount;
          } catch (err) {
            console.log("Error: " + err);
          }
        },
        message: "Email address is not unique",
      },
    },
    gender: {
      type: String,
      lowercase: true,
      trim: true,
      enum: ["m", "f", "o"],
      required: [true, "Gender is required (m, f, o)"],
    },
    birthday: {
      type: Date,
      required: [true, "Birthday is required"],
      validate: {
        // Custom validation, no over 125 and not below 18 years old
        validator: function (value) {
          const today = new Date();
          const age = today.getYear() - value.getYear();
          return age <= 125 || age >= 18;
        },
        message: "Insert a valid birthday date",
      },
    },
    creationDate: { type: Date, default: Date.now },
    modificationDate: Date,
    address: {
      countryCode: {
        type: String,
        trim: true,
        uppercase: true,
        match: [/^[A-Z]{3}$/, "Country code is not valid"],
        validate: {
          // Calling API to see if country code exists
          validator: async function (value) {
            try {
              const res = await fetch(
                `https://restcountries.eu/rest/v2/alpha/${value.toUpperCase()}`
              );
              const result = await res.json();
              return result.status === undefined;
            } catch (err) {
              console.log(err.message);
            }
          },
          message: "Insert a valid country",
        },
      },
      region: {
        type: String,
        trim: true,
        minLength: [2, "Region name too short"],
        maxLength: [25, "Region name too long"],
      },
      province: {
        type: String,
        trim: true,
        minLength: [2, "Province name too short"],
        maxLength: [25, "Province name too long"],
      },
      city: {
        type: String,
        trim: true,
        minLength: [2, "City name too short"],
        maxLength: [25, "City name too long"],
      },
      zip: {
        type: String,
        trim: true,
        match: [/^[0-9]*$/, "Zip code is not valid"],
        length: [5, "Zip code must 5 digits long"],
        maxLength: [5, "Zip code must 5 digits long"],
      },
      street: {
        type: String,
        trim: true,
        minLength: [2, "Street name too short"],
        maxLength: [25, "Street name too long"],
      },
      streetNumber: {
        type: String,
        trim: true,
        minLength: [1, "Street number too short"],
        maxLength: [10, "Street number too long"],
      },
      doorNumber: {
        type: String,
        trim: true,
        minLength: [1, "Street number too short"],
        maxLength: [10, "Street number too long"],
      },
      other: {
        type: String,
        trim: true,
        minLength: [2, "Other address data too short"],
        maxLength: [50, "Other address data too long"],
      },
    },
    telephone: {
      countryPrefix: {
        type: String,
        trim: true,
        minLength: [2, "Prefix number too short"],
        maxLength: [4, "Prefix number too long"],
        match: [/^\+[0-9]{1,6}$/, "Country prefix is not valid"],
      },
      number: {
        type: String,
        trim: true,
        minLength: [4, "Phone number too short"],
        maxLength: [15, "Phone number too long"],
        match: [/^[0-9]*$/, "Phone number must contain only digits"],
      },
    },
    tier: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);

exports.userSchema = userSchema;
exports.User = User;
