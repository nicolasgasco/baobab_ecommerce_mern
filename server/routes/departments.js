const express = require("express");
const router = express.Router();

const { departmentSchema, Department } = require("../models/departments");

const validateObjectId = require("../middleware/validateObjectId");

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
  console.log();
  if (departments.length === 0) {
    return res.status(404).send({ error: "Nothing found" });
  } else {
    res.send({
      resultsFound: departments.length,
      sortBy: language,
      results: departments,
    });
  }
});

// GET a specific department (used for validation too)
router.get("/:id", validateObjectId, async (req, res) => {
  if (!res) res.status(500).send("Error");

  let id = req.params.id;

  // Database request
  const department = await Department.find({ _id: id });
  if (!department[0]) {
    return res.status(404).send({ error: "Department not found" });
  }
  res.send({
    resultsFound: 1,
    result: department[0],
  });
});

module.exports = router;
