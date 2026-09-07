import { server } from "./rpc";
import { withRetry } from "./retry";
import { Contract, scValToNative } from "@stellar/stellar-sdk";

export interface DecodedEvent {
  contractId: string;
  ledgerSeq: bigint;
  eventType: string;
  topics: unknown[];
  data: unknown;
  txHash: string;
}

function contractIdToString(contractId: unknown): string {
  if (typeof contractId === "string") return contractId;
  if (contractId instanceof Contract) return contractId.contractId();
  throw new Error(`Unable to convert contractId to string: ${String(contractId)}`);
}

export function mapRawEvent(raw: any): DecodedEvent {
  return {
    contractId: contractIdToString(raw.contractId),
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