import { getLatestLedgerSeq } from "./ledger";
import { log } from "./logger";

const POLL_INTERVAL_MS = 5000;

export function startPolling(onNewLedger: (ledgerSeq: number) => Promise<void>) {
  let lastSeen = 0;

  const tick = async () => {
    try {
      const latest = await getLatestLedgerSeq();
      if (latest > lastSeen) {
        log(`New ledger detected: ${latest}`);
        await onNewLedger(latest);
        lastSeen = latest;
      }
    } catch (err) {
      log("Poll tick failed, will retry next interval", err);
    }
  };

  tick();
  return setInterval(tick, POLL_INTERVAL_MS);
}