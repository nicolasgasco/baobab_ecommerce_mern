const express = require("express");
const router = express.Router();

const departmentsController = require("../controllers/departments");

const validateObjectId = require("../middleware/validateObjectId");

// GET all departments of a specific language
router.get("/", departmentsController.getLocalizedDepartments);

// GET a specific department (used for validation too)
router.get("/:id", validateObjectId, departmentsController.getDepartmentById);

module.exports = router;
