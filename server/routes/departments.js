const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const departmentSchema = require("../models/departments");
const Department = mongoose.model("Department", departmentSchema);

// GET all departments of a specific language
router.get("/", async (req, res) => {
  try {
    let language = req.query.lang;
    let filter;
    if (language) {
      filter = { _id: 1 };
      filter[`translations.${language}`] = 1;
    }

    // Dictionary request
    const users = await Department.find()
      .sort(`translations.${language}`)
      .select(filter);
    res.send({
      resultsFound: users.length,
      sortBy: language,
      results: users,
    });
  } catch (err) {
    console.log("Error: " + err.message);
    res.status(400).send({ error: err.message });
  }

  if (!res) {
    res.send("Error");
  }
});

module.exports = router;
