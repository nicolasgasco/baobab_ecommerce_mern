const Joi = require("joi");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const encryptPassword = require("./middleware/encryptPassword");

const mongoose = require("mongoose");
const express = require("express");

const passport = require("passport");
const session = require("express-session");
const initializePassport = require("./passport-config");

// External routes from routes folder
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const departmentsRouter = require("./routes/departments");
const productsRouter = require("./routes/products");
const { ObjectId } = require("bson");

const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  app.use(morgan("tiny"));
}

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

// Helmet for security
app.use(helmet());

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

initializePassport(
  passport,
  async (email) => {
    const userSchema = require("./models/users");
    const User = mongoose.model("User", userSchema);
    try {
      const user = await User.findOne({ email });
      if (user) {
        return user;
      } else {
        return null;
      }
    } catch (err) {
      console.log("Error: " + err.message);
      return null;
    }
  },
  async (id) => {
    try {
      const user = await User.find({ _id: ObjectId(id) });
      if (user) {
        return user;
      } else {
        return null;
      }
    } catch (err) {
      console.log("Error: " + err.message);
      return null;
    }
  }
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/fail",
  })
);

app.delete("/logout", (req, res) => {
  req.logOut();
  res.send({ loggedOut: true, msg: "Logout successful" });
  // req.session.destroy(function (err) {
  //   res.send({ loggedOut: true, msg: "Logout successful" });
  // });
});

app.get("/success", (req, res) => {
  res.send({
    success: true,
    msg: "Login successful",
    user: req.user,
    session: true,
  });
});

app.get("/fail", (req, res) => {
  res.send({
    success: false,
    msg: "Wrong user or password",
    session: false,
  });
});

// Middleware to check if authenticated, not sure if I'll use, same can be done for checkNotAuthenticated
// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   } else {
//     res.redirect("/fail");
//   }
// }

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
