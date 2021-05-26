module.exports = function() {
  // Catching all remaining exceptions
  process.on("uncaughtException", (err) => {
    console.log("Uncaught exception: " + err.message, err);
    process.exit(1);
  });
  process.on("unhandledRejection", (err) => {
    console.log("Unhandled rejection: " + err.message + "\n" + err);
    process.exit(1);
  });
};
