const request = require("supertest");
const server = require("../testserver.js");

afterAll(async () => {
  server.close();
});

describe("getOddds", () => {
  it("should fetch latest odds", async () => {
    const res = await request(server).get("/api/odds");

    expect(200);
    expect(res.body).toBeDefined();
    expect(typeof res.body).toBe("object");
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toHaveProperty("sport_key");
    expect(res.body[0]).toHaveProperty("sport_title");
    expect(res.body[0]).toHaveProperty("home_team");
    expect(res.body[0]).toHaveProperty("away_team");
    expect(res.body[0]).toHaveProperty("commence_time");
    expect(res.body[0]).toHaveProperty("bookmakers");
  });
});
