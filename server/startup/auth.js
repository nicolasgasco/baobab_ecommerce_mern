const initializePassport = require("./passport-config");

const passportLogic = (app, passport, session, mongoose) => {
  const userSchema = require("../models/users");
  const User = mongoose.model("User", userSchema);
  const { ObjectId } = require("bson");

  initializePassport(
    passport,
    async (email) => {
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
    "/api/login",
    passport.authenticate("local", {
      successRedirect: "/success",
      failureRedirect: "/fail",
    })
  );

  app.get("/api/check", (req, res) => {
    if (req.session.passport) {
      res.send({ session: true, user: req.session.passport.user });
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
}

// Middleware to check if authenticated, not sure if I'll use, same can be done for checkNotAuthenticated
// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   } else {
//     res.redirect("/fail");
//   }
// }

module.exports = passportLogic;
