const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products");

// Middleware
const joiValidationProducts = require("../middleware/joiValidationProducts");
const validateUuid = require("../middleware/validateUuid");
const validateObjectId = require("../middleware/validateObjectId");
const createCompleteName = require("../middleware/createCompleteName");
const createKeywords = require("../middleware/createKeywords");
const validateStarRating = require("../middleware/validateStarRating");

// GET all products
router.get("/", productsController.getAllProducts);

//  GET a specific product with id
router.get("/:id", validateUuid, productsController.getProductById);

// GET products filtering per keywords
router.post(
  "/search",
  createKeywords,
  productsController.postProductsByKeywords
);

// POST a new product
router.post(
  "/",
  [createCompleteName, joiValidationProducts],
  productsController.postNewProduct
);

// PUT a specific product (with ID) (whole product)
router.put(
  "/:id",
  [joiValidationProducts, validateUuid],
  productsController.putProductWithId
);

// DELETE a specific order (with ID)
router.delete("/:id", validateUuid, productsController.deleteProductWithId);

router.post(
  "/rating/:id",
  [validateObjectId, validateStarRating],
  productsController.addStarRating
);

module.exports = router;
