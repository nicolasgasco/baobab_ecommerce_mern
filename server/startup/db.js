const runTestDb = require("../tests/db_test");

module.exports = (mongoose) => {
  if (process.env.NODE_ENV === "test") {
    return runTestDb(mongoose);
  }

  // Real database connection
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@sandbox.1ybr6.mongodb.net/bootcamp_final_project?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    )
    .then(() => {
      console.log(`Connected to database...`);
    })
    .catch((err) => console.error("Could not connect to MongoDB...", err));
};
