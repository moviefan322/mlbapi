const request = require("supertest");
const server = require("../testserver.js");

describe("GET /api/odds", () => {
  beforeAll(async () => {
    server.close();
  });

  afterAll(async () => {
    server.close();
  });

  it("should return a 200 response", async () => {
    const res = await request(server).get("/api/odds");
    expect(res.statusCode).toEqual(200);
  });

  it("should return JSON content", async () => {
    const res = await request(server).get("/api/odds");
    expect(res.type).toEqual("application/json");
  });
});
