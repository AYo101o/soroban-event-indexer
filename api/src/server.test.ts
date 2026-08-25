import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "./server";

describe("GET /health", () => {
  it("returns status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});

describe("GET /events", () => {
  it("returns 400 without contractId", async () => {
    const res = await request(app).get("/events");
    expect(res.status).toBe(400);
  });
});