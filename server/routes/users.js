const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");

// Middleware
const validateObjectId = require("../middleware/validateObjectId");



// GET all users
router.get("/", usersController.getAllUsers);

// POST a new user
router.post("/", usersController.postNewUser);

// PUT a specific user (with ID)
router.put("/:id", validateObjectId, usersController.putUserWithId);

// DELETE a specific user (with ID)
router.delete("/:id", validateObjectId, usersController.deleteUser);

module.exports = router;
