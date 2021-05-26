module.exports = function (err, req, res, next) {
  res.status(500).send({ error: err.message });
  console.log("Error: " + err.message);

//   const errMessages = [];
//   for (field in err.errors) {
//     console.log(
//       `Error: ${err.errors[field].path}: ${err.errors[field].message}`
//     );
//     errMessages.push(
//       `Error: ${err.errors[field].path}: ${err.errors[field].message}`
//     );
//   }

//   res.status(500).send({
//     error: errMessages,
//   });
};
