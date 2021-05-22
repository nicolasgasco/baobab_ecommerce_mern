const mongoose = require("mongoose");
const fetch = require("node-fetch");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [2, "Name too short"],
    maxLength: 50,
    trim: true,
    required: [true, "Name is required"],
  },
  surname: {
    type: String,
    minLength: [2, "Surname too short"],
    maxLength: 50,
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
  birthday: {
    type: Date,
    validate: {
      // Custom validation, no over 125 and not below 18 years old
      validator: function (value) {
        const today = new Date();
        const age = today.getYear() - value.getYear();
        return age <= 125 && age >= 18;
      },
      message: "Insert a valid birthday date",
    },
  },
  userSince: { type: Date, default: Date.now },
  address: {
    countryCode: {
      type: String,
      trim: true,
      uppercase: true,
      validate: {
        // Calling API to see if country code exists
        validator: async function (value) {
          try {
            const res = await fetch(
              `https://restcountries.eu/resto/v2/alpha/${value.toUpperCase()}`
            );
            const result = await res.json();
            return result.status !== 404;
          } catch  {
            const err = new Error("The service is currently not available");
            console.log(err.message)
          }
        },
        message: "Insert a valid country",
      },
    },
    region: { type: String, trim: true },
    province: { type: String, trim: true },
    city: { type: String, trim: true },
    zip: { type: String, match: [/^[0-9]*$/, "Zip code is not valid"] },
    street: String,
    streetNumber: String,
    doorNumber: String,
    other: String,
  },
  telephone: {
    countryPrefix: {
      type: String,
      trim: true,
      match: [/^\\+(?:[0-9] ?){6,14}[0-9]$/, "Prefix is not valid"],
    },
    number: {
      type: String,
      trim: true,
      match: [/^[0-9]*$/, "Phone number must contain only digits"],
    },
  },
  tier: {
    type: Number,
    default: 0,
    enum: [0, 1, 2],
  },
  // Conditional validation, works only with normal functions
  // price: {type: Number, required: function() { return this.isPublished}}
  // Custom validators as well
});

const createUser = async (userObject) => {
  try {
    // This is if you want to validate only
    await userObject.validate();
    // const result = await userObject.save();
  } catch (err) {
    for (field in err.errors) {
      console.log(`Error: ${err.errors[field].message}`);
    }
  }
};

const User = mongoose.model("user", userSchema);
const user = new User({
  name: "Angel",
  surname: "Pérez",
  email: "ciao@gmail.com",
  gender: "m",
  password: "Ciaociaociao",
  birthday: "1983-12-09",
  address: {
    countryCode: "ESP",
    region: "Basque Country",
    province: "Biscay",
    city: "Bilbao",
    zip: "48008",
    street: "Telesforo Aranzadi Kalea",
    streetNumber: "3",
    doorNumber: "4D",
  },
  telephone: {
    prefix: "+34",
    number: "605383854",
  },
  tier: 0,
});

createUser(user);
// user
//   .save()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => console.log(err));

module.exports = userSchema;
module.exports = createUser;
