const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const departmentSchema = require("../models/departments");
const Department = mongoose.model("Department", departmentSchema);

// GET all departments of a specific language
router.get("/", async (req, res) => {
  let language = req.query.lang;

  if (!res) {
    res.status(500).send("Error");
  }

  // Showing only the desired language
  let filter;
  if (language) {
    filter = { _id: 1 };
    filter[`translations.${language}`] = 1;
  }

  try {
    // Database request
    const departments = await Department.find()
      .sort(`translations.${language}`)
      .select(filter);
    res.send({
      resultsFound: departments.length,
      sortBy: language,
      results: departments,
    });
  } catch (err) {
    console.log("Error: " + err.message);
    res.status(400).send({ error: err.message });
  }
});

// GET a specific department (used for validation too)
router.get("/:id", async (req, res) => {
  let id = req.params.id;

  if (!res) {
    res.status(500).send("Error");
  }

  try {
    // Database request
    const department = await Department.find({ _id: id });
    res.send({
      resultsFound: 1,
      result: department[0],
    });
  } catch (err) {
    console.log("Error: " + err.message);
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
