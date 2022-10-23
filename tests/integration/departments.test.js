const request = require("supertest");
let app = require("../../app");
const mongoose = require("mongoose");
const { Department } = require("../../models/departments");

describe("/api/departments", () => {
  let department;
  const addValidDepartment = () => {
    department = new Department({
      name: "example",
      translations: {
        es_es: "Ejemplo",
        en_us: "Example",
      },
    });
    department.save();
  };

  // To avoid conflicts with port numbers
  beforeEach(() => {
    server = app.server;
  });
  afterEach(async () => {
    await app.server.close();
    await Department.deleteMany({});
  });

  describe("GET /", () => {
    it("test", async () => {});

    it("should return all departments", async () => {
      await addValidDepartment();
      const res = await request(server).get(`/api/departments/`);
      expect(res.status).toBe(200);
      expect(res.body.results.length).toBe(1);
      expect(Object.keys(res.body.results[0])).toEqual(
        expect.arrayContaining(["name", "translations"])
      );
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
      department = await new Department({
        name: "example",
        translations: {
          es_es: "Ejemplo",
          en_us: "Example",
        },
      });
      department.save();

      const res = await request(server).get(
        `/api/departments/${department._id}`
      );

      expect(res.status).toBe(200);
      expect(res.body.result).toHaveProperty("name", department.name);
      expect(res.body.result._id).toEqual(department._id.toString(16));
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
