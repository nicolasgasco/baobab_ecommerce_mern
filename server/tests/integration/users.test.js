const request = require("supertest");
let app = require("../../app");
const mongoose = require("mongoose");
const { User } = require("../../models/users");

describe("/api/users", () => {
  let validUser = {
    name: "John",
    surname: "Doe",
    email: "john.doe@gmailcom",
    gender: "o",
    password: "Example2021!",
    birthday: "1983-05-24",
    address: {
      countryCode: "ESP",
      region: "Basque Country",
      province: "Biscay",
      city: "Bilbao",
      zip: "48008",
      street: "Telesforo Aranzadi Kalea",
      streetNumber: "3D",
      doorNumber: "4D",
    },
    telephone: {
      countryPrefix: "+34",
      number: "605383854",
    },
    tier: 0,
  };

  const insertValidUser = () => {
    User.collection.insertOne(validUser);
    delete validUser._id;
  };

  const insertOrderedUsers = async () => {
    let newUser = JSON.parse(JSON.stringify(validUser));

    delete newUser._id;
    newUser.name = "AAA";
    newUser.email = "example2@gmail.com";
    await User.collection.insertOne(newUser);

    delete newUser._id;
    newUser.name = "FFF";
    newUser.email = "example3@gmail.com";
    await User.collection.insertOne(newUser);

    delete newUser._id;
    newUser.name = "ZZZ";
    newUser.email = "example4@gmail.com";
    await User.collection.insertOne(newUser);
  };

  // const createNewUser = (id) => {
  //   validProduct.department = id;
  //   return new Product(validProduct);
  // };

  // To avoid conflicts with port numbers
  beforeEach(async () => {
    server = app.server;
  });
  afterEach(async () => {
    await app.server.close();
    await User.deleteMany({});
  });

  describe("GET /", () => {
    // Test in first position never works right
    it("Test", async () => {});

    it("should return all users", async () => {
      await insertValidUser();

      const res = await request(server).get("/api/users");

      expect(res.status).toBe(200);
      expect(res.body.results.length).toBe(1);
    });

    it("should return 404 if there are no products at all", async () => {
      const res = await request(server).get("/api/users/");
      expect(res.error.text).toBe('{"error":"Nothing found"}');
    });

    it("should return an ordered (ascending, default) array of users (without 'order' string param)", async () => {
      await insertOrderedUsers();
      const res = await request(server).get("/api/users/?sortBy=name");
      expect(res.status).toBe(200);

      // Three users
      expect(res.body.results.length).toBe(3);
      // Sorted by name
      expect(res.body.sortBy === "name").toBeTruthy();
      // Ordered not specified
      expect(!res.body.order).toBeTruthy();
      // In ascending order
      expect(res.body.results[0].name === "AAA").toBeTruthy();
      expect(res.body.results[1].name === "FFF").toBeTruthy();
      expect(res.body.results[2].name === "ZZZ").toBeTruthy();
    });

    it("should return an ordered (ascending, specified) array of users (with 'order' string param)", async () => {
      await insertOrderedUsers();
      const res = await request(server).get("/api/users/?sortBy=name&order=1");
      expect(res.status).toBe(200);

      // Three users
      expect(res.body.results.length).toBe(3);
      // Sorted by name
      expect(res.body.sortBy === "name").toBeTruthy();
      // Ordered not specified
      expect(res.body.order === "1").toBeTruthy();
      // In ascending order
      expect(res.body.results[0].name === "AAA").toBeTruthy();
      expect(res.body.results[1].name === "FFF").toBeTruthy();
      expect(res.body.results[2].name === "ZZZ").toBeTruthy();
    });

    it("should return an ordered (descending, specified) array of users (with 'order' string param)", async () => {
      await insertOrderedUsers();
      const res = await request(server).get("/api/users/?sortBy=name&order=-1");
      expect(res.status).toBe(200);

      // Three users
      expect(res.body.results.length).toBe(3);
      // Sorted by name
      expect(res.body.sortBy === "name").toBeTruthy();
      // Ordered not specified
      expect(res.body.order === "-1").toBeTruthy();
      // In descending order
      expect(res.body.results[2].name === "AAA").toBeTruthy();
      expect(res.body.results[1].name === "FFF").toBeTruthy();
      expect(res.body.results[0].name === "ZZZ").toBeTruthy();
    });

    it("should return standard result when string param other than sortBy is provided", async () => {
      await insertOrderedUsers();
      const res = await request(server).get("/api/users/?sort=name");
      
      expect(res.status).toBe(200);
      expect(res.body.results.length).toBe(3);
      expect(!res.body.sortBy).toBeTruthy();
      expect(!res.body.order).toBeTruthy();

      // In descending order
      expect(res.body.results[0].name === "AAA").toBeTruthy();
      expect(res.body.results[1].name === "FFF").toBeTruthy();
      expect(res.body.results[2].name === "ZZZ").toBeTruthy();
    });

    it("should return standard result when invalid sortBy is provided", async () => {
      await insertOrderedUsers();
      const res = await request(server).get("/api/users/?sortBy=1");
      
      expect(res.status).toBe(200);
      expect(res.body.results.length).toBe(3);
      // Sorted by name
      expect(res.body.sortBy === "1").toBeTruthy();
      expect(!res.body.order).toBeTruthy();
      // In descending order
      expect(res.body.results[0].name === "AAA").toBeTruthy();
      expect(res.body.results[1].name === "FFF").toBeTruthy();
      expect(res.body.results[2].name === "ZZZ").toBeTruthy();
    });

    it("should return standard results when invalid order is provided", async () => {
      await insertOrderedUsers();
      const res = await request(server).get("/api/users/?sortBy=name&order=desc");

      expect(res.status).toBe(200);
      // Three users
      expect(res.body.results.length).toBe(3);
      // Sorted by name
      expect(res.body.sortBy === "name").toBeTruthy();
      expect(!res.body.order).toBeTruthy();
      // In descending order
      expect(res.body.results[0].name === "AAA").toBeTruthy();
      expect(res.body.results[1].name === "FFF").toBeTruthy();
      expect(res.body.results[2].name === "ZZZ").toBeTruthy();
    });

    //   it("should return 404 is there are no results in given page number (with valid page size)", async () => {
    //     const res = await request(server).get(
    //       "/api/products/?pageNum=1000&pageSize=5"
    //     );
    //     expect(res.status).toBe(404);
    //   });
    // });

    // describe("GET /:id", () => {
    //   it("should return a product if valid id is passed", async () => {
    //     // Adding a department first to valide ID
    //     const department = new Department({
    //       _id: mongoose.Types.ObjectId(),
    //       name: "shoes",
    //       translations: {
    //         es_es: "Zapatos",
    //         en_us: "Shoes",
    //       },
    //     });
    //     await department.save();

    //     const product = createNewProduct(department._id);
    //     await product.save();

    //     const res = await request(server).get(
    //       `/api/products/${product.productId}`
    //     );

    //     expect(res.status).toBe(200);
    //   });

    //   it("should return 404 if no product is found", async () => {
    //     // Adding a department first to validate ID
    //     const id = uuidv4();
    //     const res = await request(server).get(`/api/products/${id}`);

    //     expect(res.status).toBe(404);
    //   });

    //   it("should return 400 if invalid (formatting too) id is passed", async () => {
    //     // Adding a department first to validate ID
    //     const id = uuidv4();
    //     const res = await request(server).get(`/api/products/123`);

    //     expect(res.status).toBe(400);
    //   });
    // });

    // describe("POST /", () => {
    //   it("should write a user to the DB if user data is valid", async () => {
    //     // This is automatically generated somewhere during the tests
    //     const department = new Department({
    //       _id: mongoose.Types.ObjectId(),
    //       name: "beauty",
    //       translations: {
    //         es_es: "Beauty",
    //         en_us: "Belleza",
    //       },
    //     });
    //     await department.save();

    //     const validProductCopy = JSON.parse(JSON.stringify(validProduct));
    //     validProductCopy.department = department._id;
    //     // This is necessary for some reason
    //     delete validProductCopy._id;
    //     const res = await request(server)
    //       .post("/api/products")
    //       .send(validProductCopy);

    //     expect(res.status).toBe(200);
    //   });

    //   it("should return 400 if user data is missing (Joi validation)", async () => {
    //     const res = await request(server).post("/api/products").send({});
    //     wf;
    //     expect(res.status).toBe(400);
    //   });

    //   it("should return 400 if brand name is not valid (Joi validation)", async () => {
    //     const invalidProduct = JSON.parse(JSON.stringify(validProduct));
    //     delete invalidProduct._id;
    //     invalidProduct.completeName.brand = "";

    //     const res = await request(server)
    //       .post("/api/products")
    //       .send(invalidProduct);

    //     expect(res.status).toBe(400);
    //   });

    //   it("should return 500 if brand name is missing (Joi validation)", async () => {
    //     const invalidProduct = JSON.parse(JSON.stringify(validProduct));
    //     delete invalidProduct._id;
    //     delete invalidProduct.completeName.brand;

    //     const res = await request(server)
    //       .post("/api/products")
    //       .send(invalidProduct);

    //     expect(res.status).toBe(400);
    //   });
    // });

    // describe("PUT /:id", () => {
    //   it("should modify a user to the DB if user data is valid", async () => {
    //     // This is automatically generated somewhere during the tests
    //     const department = new Department({
    //       _id: mongoose.Types.ObjectId(),
    //       name: "beauty",
    //       translations: {
    //         es_es: "Beauty",
    //         en_us: "Belleza",
    //       },
    //     });
    //     await department.save();

    //     const validProductCopy = JSON.parse(JSON.stringify(validProduct));
    //     validProductCopy.department = department._id;
    //     // This is necessary for some reason
    //     delete validProductCopy._id;

    //     const productToModify = new Product(validProductCopy);
    //     productToModify.save();

    //     const modifiedProduct = JSON.parse(JSON.stringify(productToModify));
    //     delete modifiedProduct._id;
    //     modifiedProduct.completeName.brand = "New brand";
    //     modifiedProduct.pricingInfo.price = 9.99;

    //     const res = await request(server)
    //       .put(`/api/products/${productToModify.productId}`)
    //       .send(modifiedProduct);

    //     expect(res.status).toBe(200);
    //   });

    //   it("should return 400 if user data is missing (Joi validation)", async () => {
    //     const res = await request(server).post("/api/products").send({});

    //     expect(res.status).toBe(400);
    //   });
    //   it("should return 400 if brand name is not valid (Joi validation)", async () => {
    //     const invalidProduct = JSON.parse(JSON.stringify(validProduct));
    //     delete invalidProduct._id;
    //     invalidProduct.completeName.brand = "";

    //     const res = await request(server)
    //       .post("/api/products")
    //       .send(invalidProduct);

    //     expect(res.status).toBe(400);
    //   });

    //   it("should return 500 if brand name is missing (Joi validation)", async () => {
    //     const invalidProduct = JSON.parse(JSON.stringify(validProduct));
    //     delete invalidProduct._id;
    //     delete invalidProduct.completeName.brand;

    //     const res = await request(server)
    //       .post("/api/products")
    //       .send(invalidProduct);

    //     expect(res.status).toBe(400);
    //   });
    // });

    // describe("DELETE /", () => {
    //   it("should delete a user from the DB if product ID is valid", async () => {
    //     const department = new Department({
    //       _id: mongoose.Types.ObjectId(),
    //       name: "beauty",
    //       translations: {
    //         es_es: "Beauty",
    //         en_us: "Belleza",
    //       },
    //     });
    //     await department.save();

    //     const product = createNewProduct(department._id);
    //     await product.save();

    //     const res = await request(server).delete(
    //       `/api/products/${product.productId}`
    //     );

    //     expect(res.status).toBe(200);
    //   });

    //   it("should return 400 if wrongly formatted id is passed", async () => {
    //     const res = await request(server).delete(`/api/products/1`);
    //     expect(res.status).toBe(400);
    //   });

    //   it("should return 404 if id of non-existing product is passed", async () => {
    //     const res = await request(server).delete(`/api/products/${uuidv4()}`);
    //     expect(res.status).toBe(404);
    //   });
  });
});
