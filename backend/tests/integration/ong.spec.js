const req = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("ONG", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create new ONG", async () => {
    const res = await req(app)
      .post("/ongs")
      .send({
        name: "TEST",
        email: "contato@test.com",
        whatsapp: "1900000000",
        city: "Campinas",
        uf: "SP"
      });

    expect(res.body).toHaveProperty("id");
    expect(res.body.id).toHaveLength(8);
  });
});
