const { ObjectID } = require("mongodb");
const productSchemaJoi = require("../joi/products");

const { Product } = require("../models/products");

const getAllProducts = async (req, res) => {
  const pageNumber = req.query.pageNum;
  const pageSize = req.query.pageSize;

  const department = req.query.department;

  // Populating department name from another table, with name and without id
  const totalProducts = await Product.find().countDocuments();

  // Failsafe in case page is trying to get a page that doesn't exist
  if (+pageSize > totalProducts) {
    pageNumber = 1;
  }

  // Query param for sorting, by which and in which order
  let sortBy = req.query.sortBy;
  const order = req.query.order;

  // You can add a - in front of key for descending order
  sortBy = order === "-1" ? "-" + sortBy : sortBy;

  let products;
  if (department) {
    // Populating department name from another table, with name and without id
    products = await Product.find({
      department: new ObjectID(department),
    })
      .sort(sortBy)
      .populate("department", "name _id")
      .skip((pageNumber - 1) * pageSize)
      .limit(+pageSize);
  } else {
    // Populating department name from another table, with name and without id
    products = await Product.find()
      .sort(sortBy)
      .populate("department", "name _id")
      .skip((pageNumber - 1) * pageSize)
      .limit(+pageSize);
  }

  if (products.length === 0) {
    return res.status(404).send({ error: "No results found" });
  }

  res.send({
    resultsFound: products.length,
    pageNumber,
    pageSize,
    order: order === "1" || order === "-1" ? order : undefined,
    sortBy,
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

const postProductsByKeywords = async (req, res) => {
  // I will actually use an empty string as signal for "search all"
  // if (!req.body.keywords) res.status(400).send({ error: "Keywords not valid" });
  const keywordsRegex = new RegExp(req.body.keywords, "i");

  let pageNumber = req.query.pageNum;
  const pageSize = req.query.pageSize;
  const department = req.query.department;

  // Populating department name from another table, with name and without id
  let totalProducts;
  if (department) {
    const totalProducts = await Product.find({
      completeNameDesc: keywordsRegex,
      department: new ObjectID(department),
    }).countDocuments();
  } else {
    const totalProducts = await Product.find({
      completeNameDesc: keywordsRegex,
    }).countDocuments();
  }

  // Failsafe in case page is trying to get a page that doesn't exist
  if (+pageSize > totalProducts) {
    pageNumber = 1;
  }

  // Query param for sorting, by which and in which order
  let sortBy = req.query.sortBy;
  const order = req.query.order;

  // You can add a - in front of key for descending order
  sortBy = order === "-1" ? "-" + sortBy : sortBy;
  // Filtering per department only if provided
  let products;
  if (department) {
    products = await Product.find({
      completeNameDesc: keywordsRegex,
      department: new ObjectID(department),
    })
      .sort(sortBy)
      .skip((pageNumber - 1) * pageSize)
      .limit(+pageSize);
  } else {
    products = await Product.find({
      completeNameDesc: keywordsRegex,
    })
      .sort(sortBy)
      .skip((pageNumber - 1) * pageSize)
      .limit(+pageSize);
  }

  res.status(200).send({
    productsFound: products.length,
    pageNumber: +pageNumber,
    pageSize: +pageSize,
    totalProducts,
    totalPages: Math.ceil(totalProducts / pageSize),
    keywords: req.body.keywords.split("|"),
    sortBy,
    order: order === "1" || order === "-1" ? order : undefined,
    results: products,
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
exports.postProductsByKeywords = postProductsByKeywords;
exports.getProductById = getProductById;
exports.postNewProduct = postNewProduct;
exports.putProductWithId = putProductWithId;
exports.deleteProductWithId = deleteProductWithId;
