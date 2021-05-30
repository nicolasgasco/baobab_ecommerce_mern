const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products");

const validateUuid = require("../middleware/validateUuid");

// GET all products
router.get("/", productsController.getAllProducts);

//  GET a specific product with id
router.get("/:id", validateUuid, productsController.getProductById);

// POST a new product
router.post("/", productsController.postNewProduct);

// PUT a specific product (with ID) (whole product)
router.put("/:id", validateUuid, productsController.putProductWithId);

// DELETE a specific order (with ID)
router.delete("/:id", validateUuid, productsController.deleteProductWithId);

module.exports = router;
