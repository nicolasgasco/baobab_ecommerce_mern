module.exports = (mongoose) => {
  // Test database connection
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@sandbox.1ybr6.mongodb.net/bootcamp_final_project_tests?retryWrites=true&w=majority`,
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
