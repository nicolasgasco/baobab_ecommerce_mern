const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

// const asyncMiddleware = require("../middleware/async");


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

  // Database request
  const departments = await Department.find()
    .sort(`translations.${language}`)
    .select(filter);
  res.send({
    resultsFound: departments.length,
    sortBy: language,
    results: departments,
  });
});

// GET a specific department (used for validation too)
router.get("/:id", async (req, res) => {
  let id = req.params.id;

  if (!res) {
    res.status(500).send("Error");
  }

  // Database request
  const department = await Department.find({ _id: id });
  res.send({
    resultsFound: 1,
    result: department[0],
  });
});

module.exports = router;
