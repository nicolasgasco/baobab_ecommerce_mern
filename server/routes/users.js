const express = require("express");
const router = express.Router();

// All logic is here
const usersController = require("../controllers/users");
const joiValidationUsers = require("../middleware/joiValidationUsers");

// Middleware validation
const validateObjectId = require("../middleware/validateObjectId");

// GET all users
router.get("/", usersController.getAllUsers);

// GET user by ID
router.get("/:id", validateObjectId, usersController.getUserById);

// POST a new user
router.post("/", joiValidationUsers, usersController.postNewUser);

// PUT a specific user (with ID)
router.put("/:id", validateObjectId, usersController.putUserWithId);

// DELETE a specific user (with ID)
router.delete("/:id", validateObjectId, usersController.deleteUser);

module.exports = router;
