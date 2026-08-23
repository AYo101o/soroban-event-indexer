import { server } from "./rpc";
import { withRetry } from "./retry";
import { scValToNative } from "@stellar/stellar-sdk";

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