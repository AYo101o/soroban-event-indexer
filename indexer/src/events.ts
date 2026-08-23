import { server } from "./rpc";
import { withRetry } from "./retry";
import { scValToNative } from "@stellar/stellar-sdk";

export interface DecodedEvent {
  contractId: string;
  ledgerSeq: bigint;
  eventType: string;
  topics: unknown[];
  data: unknown;
  txHash: string;
}

export function mapRawEvent(raw: any): DecodedEvent {
  return {
    contractId: raw.contractId,
    ledgerSeq: BigInt(raw.ledger),
    eventType: raw.topic?.[0] ? decodeEventValue(raw.topic[0]) : "unknown",
    topics: (raw.topic || []).map((t: unknown) => decodeEventValue(t)),
    data: decodeEventValue(raw.value),
    txHash: raw.txHash,
  };
}

export function decodeEventValue(value: unknown) {
  try {
    return scValToNative(value as any);
  } catch (err) {
    return null;
  }
}
export async function fetchEventsForRange(startLedger: number, contractIds: string[]) {
  return withRetry(() =>
    server.getEvents({
      startLedger,
      filters: [
        {
          type: "contract",
          contractIds,
        },
      ],
      limit: 100,
    })
  );
}