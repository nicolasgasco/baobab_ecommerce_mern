const productSchemaJoi = require("../joi/products");

const { Product } = require("../models/products");

const getAllProducts = async (req, res) => {
  const pageNumber = req.query.pageNum;
  const pageSize = req.query.pageSize;

  // Populating department name from another table, with name and without id
  const products = await Product.find()
    .populate("department", "name -_id")
    .skip((pageNumber - 1) * pageSize)
    .limit(+pageSize);

  if (products.length === 0) {
    return res.status(404).send({ error: "No results found" });
  }

  res.send({
    resultsFound: products.length,
    pageNumber,
    pageSize,
    results: products,
  });
};

const getProductById = async (req, res) => {
  // Id validated by middleware
  const id = req.params.id;

  // Populating department name from another table, with name and without id
  const product = await Product.find({ productId: id }).populate(
    "department",
    "name -_id"
  );

  if (product.length === 0) {
    return res.status(404).send({ error: "No results found" });
  }

  res.send({
    resultsFound: 1,
    result: product[0],
  });
};

const postNewProduct = async (req, res) => {
  // Joi validation in middleware
  console.log("Joi validation successful");

  // Creating new mongoose product with body
  const product = new Product(req.body);
  // Second round of validation with Mongoose
  await product.validate();
  console.log("Mongoose validation successful");

  // Saving in DB and sending result
  const result = await product.save();
  res.send({ insertedCount: 1, result: result });
};

const putProductWithId = async (req, res) => {
  console.log("Joi validation successful");

  // Add a modification date
  req.body.modificationDate = new Date();

  const updatedProduct = new Product(req.body);
  // Validation with Mongoose
  await updatedProduct.validate();

  // Finding and updating at the same
  const result = await Product.findOneAndUpdate(
    { productId: req.params.id },
    req.body,
    {
      new: true,
    }
  );

  if (!result) {
    return res.status(404).send({ error: "Nothing found" });
  }
  res.send({ updatedCount: 1, updatedObj: result });
};

const deleteProductWithId = async (req, res) => {
  const result = await Product.remove({ productId: req.params.id });
  if (result.deletedCount === 0) {
    return res.status(404).send("Product not found");
  }
  res.send({ deletedCount: 1, result: result });
};

exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
exports.postNewProduct = postNewProduct;
exports.putProductWithId = putProductWithId;
exports.deleteProductWithId = deleteProductWithId;
