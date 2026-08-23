import { server } from "./rpc";
import { withRetry } from "./retry";

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