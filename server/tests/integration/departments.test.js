const request = require("supertest");
let app = require("../../app");
const mongoose = require("mongoose");
const { Department } = require("../../models/departments");

describe("/api/departments", () => {
  // To avoid conflicts with port numbers
  beforeEach(() => {
    server = app.server;
  });
  afterEach(async () => {
    app.server.close();
    await Department.deleteMany({});
  });

  describe("GET /", () => {
    it("should return all departments", async () => {
      await Department.collection.insertMany([
        {
          name: "automotive",
          translations: {
            "es-es": "Coche y Moto",
            en_us: "Automotive",
          },
        },
      ]);
      const res = await request(server).get("/api/departments");
      expect(res.status).toBe(200);
      expect(res.body.results.length).toBe(1);
      expect(
        res.body.results.some((dep) => dep.name === "automotive")
      ).toBeTruthy();
    });
  });
  describe("GET /:id", () => {
    it("should return a department if valid id is passed", async () => {
      const department = new Department({
        name: "automotive",
        translations: {
          es_es: "Coche y Moto",
          en_us: "Automotive",
        },
      });
      await department.save();

      const res = await request(server).get(
        `/api/departments/${department._id}`
      );
      expect(res.status).toBe(200);
      expect(res.body.result).toHaveProperty("name", department.name);
    });

    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get("/api/departments/1");
      expect(res.status).toBe(404);
    });

    it("should return 404 if no department id is passed", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get(`/api/departments/${id}`);
      expect(res.status).toBe(404);
    });
  });
});
