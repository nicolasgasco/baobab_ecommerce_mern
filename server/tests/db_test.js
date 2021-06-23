const mongoose = require("mongoose");
module.exports = () => {
  // Test database connection
  mongoose
    .connect(
      "mongodb://localhost:27017/bootcamp_final_project_tests",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    )
    .then(() => {
      console.log(`Connected to TEST database...`);
    })
    .catch((err) => console.error("Could not connect to MongoDB...", err));
};
