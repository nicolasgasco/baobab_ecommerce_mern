const express = require("express");
const router = express.Router();

const departmentsController = require("../controllers/departments");

const validateObjectId = require("../middleware/validateObjectId");

// GET all departments of a specific language
router.get("/", departmentsController.getLocalizedDepartments);

// GET a specific department (used for validation too)
router.get("/:id", validateObjectId, departmentsController.getDepartmentById);

// POST a new department
router.post("/", departmentsController.postNewDepartment);

module.exports = router;
