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

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

// app.use(encryptPassword);
app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
}

// Used to redirect to react page when a route other than index is refreshed by user
app.use("/api/users", usersRouter);
app.use("/", indexRouter);


// Database connection
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@sandbox.1ybr6.mongodb.net/bootcamp_final_project?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => {
    // if (err) {
    //   res.send(err);
    // }
    // console.log(client)

    // app.locals.db = client.db("bootcamp_final_project");
    console.log(`Connected to database...`);
  })
  .catch((err) => console.error("Could not connect to MongoDB...", err));


// Use Joi for input validation
// First step is describing schema inside app.get or whatever https://codewithmosh.com/courses/293204/lectures/4516859
// const schema = { name: Joi.string().min(3).required()}
// const result = Joi.validate(req.body, schema)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
