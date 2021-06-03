const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products");

// Middleware
const joiValidationProducts = require("../middleware/joiValidationProducts");
const validateUuid = require("../middleware/validateUuid");
const createCompleteName = require("../middleware/createCompleteName");
const createKeywords = require("../middleware/createKeywords");

// GET all products
router.get("/", productsController.getAllProducts);

// GET products filtering per keywords 
router.get("/search", createKeywords, productsController.getProductsByKeywords);

//  GET a specific product with id
router.get("/:id", validateUuid, productsController.getProductById);

// POST a new product
router.post("/", [createCompleteName, joiValidationProducts], productsController.postNewProduct);

// PUT a specific product (with ID) (whole product)
router.put("/:id", [joiValidationProducts, validateUuid], productsController.putProductWithId);

// DELETE a specific order (with ID)
router.delete("/:id", validateUuid, productsController.deleteProductWithId);

module.exports = router;
