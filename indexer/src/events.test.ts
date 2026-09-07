import { describe, it, expect } from "vitest";
import { Contract } from "@stellar/stellar-sdk";
import { mapRawEvent } from "./events";

const SAMPLE_CONTRACT_ID = "CA3D5KRYM6CB7OWQ6TWYRR3Z4T7GNZLKERYNZGGA5SOAOPIFY6YQGAXE";

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

  it("converts a Contract instance contractId (as returned by getEvents) to its strkey string", () => {
    const raw = {
      contractId: new Contract(SAMPLE_CONTRACT_ID),
      ledger: 1000,
      topic: [],
      value: undefined,
      txHash: "abc123",
    };

    const mapped = mapRawEvent(raw);

    expect(mapped.contractId).toBe(SAMPLE_CONTRACT_ID);
    expect(typeof mapped.contractId).toBe("string");
  });
});