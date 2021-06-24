var express = require("express");
var router = express.Router();
const path = require("path");

if (process.env.NODE_ENV === "production") {
  router.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../build/index.html"), function (err) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
    });
  });
}

module.exports = router;
