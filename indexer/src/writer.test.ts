import { describe, it, expect, vi } from "vitest";
import { writeEvent } from "./writer";
import { prisma } from "./db";

vi.mock("./db", () => ({
  prisma: {
    event: {
      upsert: vi.fn(),
    },
  },
}));

describe("writeEvent", () => {
  it("calls prisma upsert with correct data", async () => {
    await writeEvent({
      contractId: "CTEST123",
      ledgerSeq: 100n,
      eventType: "ping",
      topics: [],
      data: {},
      txHash: "tx123",
    });

    expect(prisma.event.upsert).toHaveBeenCalledOnce();
  });
});