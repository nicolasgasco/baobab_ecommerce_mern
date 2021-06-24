const request = require("supertest");
let app = require("../../app");

const bcrypt = require("bcrypt");

const mongoose = require("mongoose");
const { User } = require("../../models/users");

describe("/api/users", () => {
  let validUser = {
    name: "John",
    surname: "Doe",
    email: "john.doe@gmail.com",
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
    const user = User.collection.insertOne(validUser);
    return user;
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
      const res = await request(server).get(
        "/api/users/?sortBy=name&order=desc"
      );

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

    describe("GET /:id", () => {
      it("should return a user if valid id is passed", async () => {
        const user = await insertValidUser();

        const res = await request(server).get(`/api/users/${user.ops[0]._id}`);

        expect(res.status).toBe(200);
        // One user is fetched
        expect(res.body.resultsFound === 1).toBeTruthy();
        // Id matches
        expect(res.body.result._id === user.ops[0]._id.toString()).toBeTruthy();
      });

      it("should return 404 if no product is found", async () => {
        // Generating a random ID
        const id = mongoose.Types.ObjectId();
        const res = await request(server).get(`/api/users/${id}`);

        expect(res.status).toBe(404);
        expect(res.body.error === "Nothing found").toBeTruthy();
      });

      it("should return 400 if invalid id is passed (middleware check", async () => {
        const res = await request(server).get(`/api/users/12345`);

        expect(res.status).toBe(400);
        expect(res.body.error === "Invalid ObjectId").toBeTruthy();
      });
    });

    describe("POST /", () => {
      it("should write a user to the DB if user data is valid", async () => {
        // Deep copy of our user
        const newUser = JSON.parse(JSON.stringify(validUser));
        delete newUser._id;

        const res = await request(server).post("/api/users").send(newUser);

        expect(res.status).toBe(200);
        expect(res.body.insertedCount === 1).toBeTruthy();
        // Check if password is hashed
        expect(
          bcrypt.compareSync(newUser.password, res.body.result.password)
        ).toBeTruthy();
      });

      it("should return 400 if any of the user data (except password) is missing (Joi validation)", async () => {
        const newUser = JSON.parse(JSON.stringify(validUser));
        delete newUser._id;
        delete newUser.email;

        const res = await request(server).post("/api/users").send(newUser);

        expect(res.status).toBe(400);
        expect(res.body.error).toMatch(/Joi/);
      });
    });

    describe("PUT /:id", () => {
      it("should modify a user to the DB if user data is valid", async () => {
        const validUserCopy = JSON.parse(JSON.stringify(validUser));

        const userToModify = new User(validUserCopy);
        userToModify.save();

        const modifiedUser = JSON.parse(JSON.stringify(userToModify));
        delete modifiedUser._id;
        modifiedUser.name = "New name";
        modifiedUser.email = "newmail@gmail.com";

        const res = await request(server)
          .put(`/api/users/${userToModify._id}`)
          .send(modifiedUser);

        expect(res.status).toBe(200);
      });

      it("should return 400 if invalid id provided", async () => {
        let validUserCopy = JSON.parse(JSON.stringify(validUser));
        delete validUserCopy._id;

        const res = await request(server)
          .put(`/api/users/12345`)
          .send(validUserCopy);

        expect(res.status).toBe(400);
        expect(res.body.error).toMatch(/Invalid/i);
      });

      it("should return 404 if valid id provided that not in the DB", async () => {
        let validUserCopy = JSON.parse(JSON.stringify(validUser));
        delete validUserCopy._id;

        const id = mongoose.Types.ObjectId();
        const res = await request(server)
          .put(`/api/users/${id}`)
          .send(validUserCopy);

        expect(res.status).toBe(404);
        expect(res.body.error).toMatch(/nothing found/i);
      });

      it("should return 400 if no id at all is provided", async () => {
        let validUserCopy = JSON.parse(JSON.stringify(validUser));
        delete validUserCopy._id;

        const id = mongoose.Types.ObjectId();
        const res = await request(server)
          .put(`/api/users/`)
          .send(validUserCopy);

        expect(res.status).toBe(400);
        expect(res.body.error).toMatch(/missing/);
      });
    });

    describe("DELETE /", () => {
      it("should delete a user from the DB if user ID is valid", async () => {
        const user = await insertValidUser();

        const res = await request(server).delete(
          `/api/users/${user.ops[0]._id}`
        );

        expect(res.status).toBe(200);
        expect(res.body.result.deletedCount === 1).toBeTruthy();
      });

      it("should return 400 if wrongly formatted id is passed", async () => {
        const res = await request(server).delete(`/api/users/12345`);

        expect(res.status).toBe(400);
        expect(res.body.error).toMatch(/ObjectId/);
      });

      it("should return 404 if id of non-existing product is passed", async () => {
        // Creating valid id
        const id = mongoose.Types.ObjectId();

        const res = await request(server).delete(`/api/users/${id}`);

        expect(res.status).toBe(404);
        expect(res.body.error).toMatch(/found/);
      });
    });
  });
});
