const request = require("supertest");
let app = require("../../app");
const mongoose = require("mongoose");
const { Product } = require("../../models/products");
const { Department } = require("../../models/departments");

// Using for product id
const { v4: uuidv4 } = require("uuid");

const validProduct = {
  completeName: {
    brand: "Parafina",
    shortDesc: "Gafas de sol",
    productName: "Aviator",
    productDesc1: "en material 100% riciclado",
    productDesc2: "lentes polarizadas",
    productDesc3: "Talla unica",
    productGender: "male",
  },
  pricingInfo: {
    priceHistory: [49.87, 43.5],
    price: 49.59,
  },
  department: "60aa4fabd82af1469cdbda95",
  stock: 20,
  seller: "Parafina & Co",
  ecoInfo: {
    originCountryCode: "ESP",
    productionCountryCode: "CHN",
    socialMission: "Donate 5% to poor children",
    environmentMission: "100% recycled",
  },
};

const insertValidProduct = async () => {
  await Product.collection.insertOne(validProduct);
};

const createNewProduct = (id) => {
  validProduct.department = id;
  return new Product(validProduct);
};

describe("/api/products", () => {
  // To avoid conflicts with port numbers
  beforeEach(() => {
    server = app.server;
  });
  afterEach(async () => {
    app.server.close();
    await Product.deleteMany({});
    await Department.deleteMany({});
  });

  describe("GET /", () => {
    it("should return all products", async () => {
      await insertValidProduct();
      const res = await request(server).get("/api/products");
      expect(res.status).toBe(200);
      expect(res.body.results.length).toBe(1);
    });

    it("should return 404 if there are no products at all", async () => {
      const res = await request(server).get("/api/products/");
      expect(res.status).toBe(404);
    });

    it("should return valid page number and size if provided", async () => {
      await insertValidProduct();
      const res = await request(server).get(
        "/api/products/?pageNum=1&pageSize=5"
      );
      expect(res.status).toBe(200);
      expect(res.body.results.length).toBe(1);
      expect(res.body.pageNumber === "1").toBeTruthy();
      expect(res.body.pageSize === "5").toBeTruthy();
    });

    it("should return 404 is there are no results in given page number (with valid page size)", async () => {
      const res = await request(server).get(
        "/api/products/?pageNum=1000&pageSize=5"
      );
      expect(res.status).toBe(404);
    });
  });

  describe("GET /:id", () => {
    it("should return a product if valid id is passed", async () => {
      // Adding a department first to valide ID
      const department = new Department({
        _id: mongoose.Types.ObjectId(),
        name: "shoes",
        translations: {
          es_es: "Zapatos",
          en_us: "Shoes",
        },
      });
      await department.save();

      const product = createNewProduct(department._id);
      await product.save();

      const res = await request(server).get(
        `/api/products/${product.productId}`
      );

      expect(res.status).toBe(200);
    });

    it("should return 404 if no product is found", async () => {
      // Adding a department first to validate ID
      const id = uuidv4();
      const res = await request(server).get(`/api/products/${id}`);

      expect(res.status).toBe(404);
    });

    it("should return 400 if invalid (formatting too) id is passed", async () => {
      // Adding a department first to validate ID
      const id = uuidv4();
      const res = await request(server).get(`/api/products/123`);

      expect(res.status).toBe(400);
    });
  });

  describe("POST /", () => {
    it("should write a user to the DB if user data is valid", async () => {
      // This is automatically generated somewhere during the tests
      const department = new Department({
        _id: mongoose.Types.ObjectId(),
        name: "beauty",
        translations: {
          es_es: "Beauty",
          en_us: "Belleza",
        },
      });
      await department.save();

      const validProductCopy = JSON.parse(JSON.stringify(validProduct));
      validProductCopy.department = department._id;
      // This is necessary for some reason
      delete validProductCopy._id;
      const res = await request(server)
        .post("/api/products")
        .send(validProductCopy);

      expect(res.status).toBe(200);
    });

    it("should return 400 if user data is missing (Joi validation)", async () => {
      const res = await request(server).post("/api/products").send({});

      expect(res.status).toBe(400);
    });
    it("should return 400 if brand name is not valid (Joi validation)", async () => {
      const invalidProduct = JSON.parse(JSON.stringify(validProduct));
      delete invalidProduct._id;
      invalidProduct.completeName.brand = "";

      const res = await request(server)
        .post("/api/products")
        .send(invalidProduct);

      expect(res.status).toBe(400);
    });

    it("should return 500 if brand name is missing (Joi validation)", async () => {
      const invalidProduct = JSON.parse(JSON.stringify(validProduct));
      delete invalidProduct._id;
      delete invalidProduct.completeName.brand;

      const res = await request(server)
        .post("/api/products")
        .send(invalidProduct);

      expect(res.status).toBe(400);
    });
  });

  describe("PUT /:id", () => {
    it("should modify a user to the DB if user data is valid", async () => {
      // This is automatically generated somewhere during the tests
      const department = new Department({
        _id: mongoose.Types.ObjectId(),
        name: "beauty",
        translations: {
          es_es: "Beauty",
          en_us: "Belleza",
        },
      });
      await department.save();

      const validProductCopy = JSON.parse(JSON.stringify(validProduct));
      validProductCopy.department = department._id;
      // This is necessary for some reason
      delete validProductCopy._id;

      const productToModify = new Product(validProductCopy);
      productToModify.save();

      const modifiedProduct = JSON.parse(JSON.stringify(productToModify));
      delete modifiedProduct._id;
      modifiedProduct.completeName.brand = "New brand";
      modifiedProduct.pricingInfo.price = 9.99;

      const res = await request(server)
        .put(`/api/products/${productToModify.productId}`)
        .send(modifiedProduct);

      expect(res.status).toBe(200);
    });

    it("should return 400 if user data is missing (Joi validation)", async () => {
      const res = await request(server).post("/api/products").send({});

      expect(res.status).toBe(400);
    });
    it("should return 400 if brand name is not valid (Joi validation)", async () => {
      const invalidProduct = JSON.parse(JSON.stringify(validProduct));
      delete invalidProduct._id;
      invalidProduct.completeName.brand = "";

      const res = await request(server)
        .post("/api/products")
        .send(invalidProduct);

      expect(res.status).toBe(400);
    });

    it("should return 500 if brand name is missing (Joi validation)", async () => {
      const invalidProduct = JSON.parse(JSON.stringify(validProduct));
      delete invalidProduct._id;
      delete invalidProduct.completeName.brand;

      const res = await request(server)
        .post("/api/products")
        .send(invalidProduct);

      expect(res.status).toBe(400);
    });
  });

  describe("DELETE /", () => {
    it("should delete a user from the DB if product ID is valid", async () => {
      const department = new Department({
        _id: mongoose.Types.ObjectId(),
        name: "beauty",
        translations: {
          es_es: "Beauty",
          en_us: "Belleza",
        },
      });
      await department.save();

      const product = createNewProduct(department._id);
      await product.save();

      const res = await request(server).delete(
        `/api/products/${product.productId}`
      );

      expect(res.status).toBe(200);
    });

    it("should return 400 if wrongly formatted id is passed", async () => {
      const res = await request(server).delete(`/api/products/1`);
      expect(res.status).toBe(400);
    });

    it("should return 404 if id of non-existing product is passed", async () => {
      const res = await request(server).delete(`/api/products/${uuidv4()}`);
      expect(res.status).toBe(404);
    });
  });
});
