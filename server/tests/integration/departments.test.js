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
      const department = new Department({
        name: "example",
        translations: {
          es_es: "Ejemplo",
          en_us: "Example",
        },
      });
      await department.save();

      const res = await request(server).get(`/api/departments/`);
      expect(res.status).toBe(200);
      // expect(res.body.results.length).toBe(1);
      expect(
        res.body.results.some((dep) => dep.name === "example")
      ).toBeTruthy();
    });

    it("should return 404 if there are no departments at all", async () => {
      const res = await request(server).get("/api/departments/");
      expect(res.status).toBe(404);
    });

    it("should return 400 is language code is wrong", async () => {
      const res = await request(server).get("/api/departments/?lang=es-es");
      expect(res.status).toBe(400);
    });
    it("should return 404 is extra query parameters are given", async () => {
      const res = await request(server).get(
        "/api/departments/?lang=es_es&orderBy=desc"
      );
      expect(res.status).toBe(404);
    });

    it("should return 400 if language other than English and Spanish are inserted", async () => {
      const res = await request(server).get("/api/departments/?lang=it_it");
      expect(res.status).toBe(400);
    });
  });
  describe("GET /:id", () => {
    it("should return a department if valid id is passed", async () => {
      const department = new Department({
        name: "example",
        translations: {
          es_es: "Ejemplo",
          en_us: "Example",
        },
      });
      await department.save();

      const res = await request(server).get(
        `/api/departments/${department._id}`
      );
      expect(res.status).toBe(200);
      expect(res.body.result).toHaveProperty("name", department.name);
    });

    it("should return 400 if invalid id is passed", async () => {
      const res = await request(server).get("/api/departments/1");
      expect(res.status).toBe(400);
    });

    it("should return 404 if no department id is found", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get(`/api/departments/${id}`);
      expect(res.status).toBe(404);
    });
  });
});
