const mongoose = require("mongoose");
const fetch = require("node-fetch");
const { v4: uuidv4 } = require("uuid");

// Needed for custom validation later
const { Department } = require("./departments");

const productSchema = new mongoose.Schema(
  {
    completeName: {
      brand: {
        type: String,
        uppercase: true,
        trim: true,
        minLength: [2, "Brand too short"],
        maxLength: [30, "Brand too long"],
        required: [true, "Brand is required"],
      },
      shortDesc: {
        type: String,
        trim: true,
        lowercase: true,
        minLength: [2, "Short desc too short"],
        maxLength: [25, "Short desc too long"],
        required: [true, "Short desc is required"],
      },
      productName: {
        type: String,
        trim: true,
        minLength: [2, "Name too short"],
        maxLength: [25, "Name too long"],
        required: [true, "Product name is required"],
        // Capitalizing every word
        set: (value) =>
          value
            .split(" ")
            .map((word) => {
              return word.charAt(0).toUpperCase() + word.substr(1);
            })
            .join(" "),
      },
      productDesc1: {
        type: String,
        lowercase: true,
        trim: true,
        minLength: [2, "Description too short"],
        maxLength: [50, "Description too long"],
        required: [true, "Product description is required"],
      },
      productDesc2: {
        type: String,
        lowercase: true,
        trim: true,
        minLength: [2, "Description too short"],
        maxLength: [50, "Description too long"],
      },
      productDesc3: {
        type: String,
        lowercase: true,
        trim: true,
        minLength: [2, "Description too short"],
        maxLength: [50, "Description too long"],
      },
      color: {
        type: String,
        lowercase: true,
        trim: true,
        minLength: [2, "Color too short"],
        maxLength: [10, "Color too long"],
        required: true,
      },
      productGender: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Gender is required"],
        enum: ["unisex", "male", "female"],
      },
    },
    completeNameDesc: {
      type: String,
      lowercase: true,
      trim: true,
      minLength: [20, "Complete desc too short"],
      maxLength: [230, "Complete desc long"],
      required: [true, "Complete desc is required"],
      match: [/[A-Za-z0-9]+/, "Complete desc doesn't contain any text"],
    },
    pictures: [
      {
        url: {
          type: String,
          trim: true,
          minLength: [10, "Url too short"],
          maxLength: [500, "Url too long"],
          required: true,
          match: [
            /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
            "Url is not valid",
          ],
        },
        alt: {
          type: String,
          lowercase: true,
          trim: true,
          required: true,
          minLength: [5, "Alt too short"],
          maxLength: [50, "Alt too long"],
        },
      },
    ],
    productId: {
      type: String,
      default: uuidv4,
    },
    stock: {
      type: Number,
      min: [0, "You cannot have negative stock"],
      max: [9999, "Current max stock is 9999"],
      set: (value) => Math.round(value),
    },
    quantity: {
      type: Number,
      min: [1, "You cannot have negative quantity"],
      max: [9, "Current max quantity is 9"],
      set: (value) => Math.round(value),
    },
    seller: {
      type: String,
      trim: true,
      required: [true, "Seller is required"],
      minLength: [2, "Description too short"],
      maxLength: [30, "Description too long"],
    },
    creationDate: { type: Date, default: Date.now },
    modificationDate: Date,
    department: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      lowercase: true,
      required: [true, "Department is required"],
      ref: "Department",
      validate: {
        // Calling API to see if country code exists
        validator: async function (value) {
          try {
            const department = await Department.findById(value);
            if (!department) {
              return false;
            }
            return true;
          } catch (err) {
            console.log("Error: " + err.message);
            return false;
          }
        },
        message: "Insert a valid ID",
      },
    },
    pricingInfo: {
      price: {
        type: Number,
        min: [0.01, "Price cannot be smaller than 0.01"],
        max: [2000, "Current max price is 2000€"],
        set: (value) => value.toFixed(2),
        required: [true, "Price is required"],
        required: [true, "Price is required"],
      },
      priceHistory: [
        {
          type: Number,
          min: [0.01, "Price history  cannot be smaller than 0.01"],
          max: [2000, "Current max price history is 2000€"],
          set: (value) => value.toFixed(2),
          required: [true, "Price history is required"],
        },
      ],
    },
    ecoInfo: {
      originCountryCode: {
        type: String,
        trim: true,
        uppercase: true,
        required: [true, "Origin country is required"],
        match: [/^[A-Z]{3}$/, "Origin country code is not valid"],
        validate: {
          // Calling API to see if country code exists
          validator: async function (value) {
            try {
              const res = await fetch(
                `https://restcountries.eu/rest/v2/alpha/${value.toUpperCase()}`
              );
              const result = await res.json();
              return result.status === undefined;
            } catch {
              const err = new Error("The service is currently not available");
              console.log(err.message);
            }
          },
          message: "Insert a valid country",
        },
      },
      productionCountryCode: {
        type: String,
        trim: true,
        uppercase: true,
        required: [true, "Production country code is required"],
        match: [/^[A-Z]{3}$/, "Production country code is not valid"],
        validate: {
          // Calling API to see if country code exists
          validator: async function (value) {
            try {
              const res = await fetch(
                `https://restcountries.eu/rest/v2/alpha/${value.toUpperCase()}`
              );
              const result = await res.json();
              return result.status === undefined;
            } catch {
              const err = new Error("The service is currently not available");
              console.log(err.message);
            }
          },
          message: "Insert a valid country",
        },
      },
      socialMission: {
        type: String,
        trim: true,
        required: [true, "Social mission is required"],
        minLength: [2, "Social mission too short"],
        maxLength: [500, "Social mission too long"],
      },
      environmentMission: {
        type: String,
        trim: true,
        required: [true, "Enviromental mission is required"],
        minLength: [2, "Environment mission too short"],
        maxLength: [500, "Environment mission too long"],
      },
    },
  },
  { collection: "products" }
);

const Product = mongoose.model("Product", productSchema);

exports.productSchema = productSchema;
exports.Product = Product;
