import { describe, it, expect } from "vitest";
import { mapRawEvent } from "./events";

describe("mapRawEvent", () => {
  it("maps a raw event to the internal shape", () => {
    const raw = {
      contractId: "CTEST123",
      ledger: 1000,
      topic: [],
      value: undefined,
      txHash: "abc123",
    };

    const mapped = mapRawEvent(raw);

    expect(mapped.contractId).toBe("CTEST123");
    expect(mapped.ledgerSeq).toBe(1000n);
    expect(mapped.txHash).toBe("abc123");
  });
});