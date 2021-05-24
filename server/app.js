const Joi = require("joi");
require("dotenv").config();
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const encryptPassword = require("./middleware/encryptPassword");

const mongoose = require("mongoose");

const express = require("express");
const app = express();
// External routes from routes folder
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const departmentsRouter = require("./routes/departments");
const productsRouter = require("./routes/products");

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

// app.use(encryptPassword);
app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
}

// Used to redirect to react page when a route other than index is refreshed by user
app.use("/api/users", usersRouter);
app.use("/api/departments", departmentsRouter);
app.use("/api/products", productsRouter);
app.use("/", indexRouter);

// Database connection
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@sandbox.1ybr6.mongodb.net/bootcamp_final_project?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => {
    console.log(`Connected to database...`);
  })
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// const productSchema = require("./models/products");
// const { ObjectId } = require("bson");
// const Product = mongoose.model("Product", productSchema);

// try {
//   const product = new Product({
//     completeName: {
//       brand: "Parafina   ",
//       shortDesc: "Gafas de sol",
//       productName: "aviator bench social Club",
//       productDesc1: "En material 100% riciclado",
//       productDesc2: "Lentes polarizadas",
//       productGender: "Unisex",
//       seller: "Parafina Co",
//     },
//     department: new ObjectId("60aa4fabd82af1469cdbda95"),
//     pricingInfo: {
//       price: 0.0234,
//       priceHistory: [10.01, 9, 3],
//     },
//     ecoInfo: {
//       originCountryCode: "ITA",
//       productionCountryCode: "ESP",
//       socialMission: "Bla bla social",
//       environmentMission: "Bla bla environment",
//     }
//   });
//   console.log(product.productName)
//   product.save();
//   console.log("Save on database")
// } catch (err) {
//   console.log(err.message);
// }

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
