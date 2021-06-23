const passport = require("passport");
const mongoose = require("mongoose");
const { User } = require("../models/users");

const joiValidationUsers = require("../middleware/joiValidationUsers");
const jwt = require("jsonwebtoken");
const { encryptPassword } = require("../middleware/encryptPassword");

// Need to store session in DB if you want to have more than 1
const session = require("express-session");
const MongoDbStore = require("connect-mongo");

const initializePassport = require("./passport-config");

// We'll need it later to generate token
let user;

const passportLogic = (app) => {
  const { User } = require("../models/users");
  const { ObjectId } = require("bson");

  initializePassport(
    // passport,
    async (email) => {
      try {
        user = await User.findOne({ email });
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
        user = await User.find({ _id: ObjectId(id) });
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
      store: MongoDbStore.create({
        mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@sandbox.1ybr6.mongodb.net/bootcamp_final_project?retryWrites=true&w=majority`,
      }),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.post(
    "/api/login",
    passport.authenticate("local", {
      successRedirect: "/success",
      failureRedirect: "/fail",
    })
  );

  app.post("/api/signin", joiValidationUsers, async (req, res) => {
    // First round of validation with Joi (middleware)
    console.log("Joi validation successful");

    // Encrypt password now and not before (middleware), otherwise it cannot be validated
    req.body.password = encryptPassword(req.body.password);

    // Creating new mongoose user with body
    const user = new User(req.body);

    // Second round of validation with Mongoose
    try {
      await user.validate();
    } catch (error) {
      console.log(error.message);
      res.status(400).send({ error: `${error.name}: ${error.message}` });
    }
    console.log("Mongoose validation successful");

    // Saving in DB and sending result
    const result = await user.save();
    // User will be authorized automatically
    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .send({ insertedCount: 1, result: result });
  });

  app.get("/api/check", (req, res) => {
    // This doesn't actually work
    const token = jwt.sign(
      { _id: this._id, name: this.name, surname: this.surname },
      process.env.JWT
    );
    if (req.session.passport) {
      res
        .header("x-auth-token", token)
        .send({ session: true, user: req.session.passport.user });
    } else {
      res.send({ session: false });
    }
  });

  app.delete("/api/logout", (req, res) => {
    req.session.destroy(function (err) {
      res.send({ loggedOut: true, msg: "Logout successful" });
    });
  });

  app.get("/success", (req, res) => {
    const token = user.generateAuthToken();
    res.status(200).header("x-auth-token", token).send({
      success: true,
      msg: "Login successful",
      session: true,
    });
  });

  app.get("/fail", (req, res) => {
    res.status(400).send({
      success: false,
      msg: "Wrong user or password",
      session: false,
    });
  });
};

// Middleware to check if authenticated, not sure if I'll use, same can be done for checkNotAuthenticated
// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   } else {
//     res.redirect("/fail");
//   }
// }

module.exports = passportLogic;
