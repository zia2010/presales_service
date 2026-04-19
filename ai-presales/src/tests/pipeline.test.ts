import app from "../app";
import request from "supertest";

describe("API — POST /lead", () => {
  it("accepts a valid lead and returns 201", async () => {
    const res = await request(app).post("/lead").send({
      name: "John Doe",
      email: "john@example.com",
      phone: "+919876543210",
      source: "instagram",
      niche: "real estate",
    });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.leadId).toBeDefined();
  });

  it("rejects lead with missing email — returns 400", async () => {
    const res = await request(app).post("/lead").send({
      name: "John Doe",
      phone: "+919876543210",
    });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.details).toContain("Valid email is required");
  });

  it("rejects lead with invalid phone — returns 400", async () => {
    const res = await request(app).post("/lead").send({
      name: "John Doe",
      email: "john@test.com",
      phone: "123",
    });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("rejects empty body — returns 400", async () => {
    const res = await request(app).post("/lead").send({});
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

describe("API — GET /health", () => {
  it("returns ok status", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});

describe("API — POST /webhook/call-complete", () => {
  it("rejects missing leadId", async () => {
    const res = await request(app).post("/webhook/call-complete").send({});
    expect(res.status).toBe(400);
  });

  it("stops on short transcript", async () => {
    const res = await request(app).post("/webhook/call-complete").send({
      leadId: "test_123",
      transcript: "Hi",
    });
    expect(res.status).toBe(200);
    expect(res.body.action).toContain("stopped");
  });

  it("accepts valid transcript", async () => {
    const res = await request(app).post("/webhook/call-complete").send({
      leadId: "test_123",
      transcript: "A".repeat(100),
    });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
