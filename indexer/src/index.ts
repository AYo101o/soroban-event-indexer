import { checkConnection } from "./rpc";
import { startPolling } from "./poller";
import { fetchEventsForRange, mapRawEvent } from "./events";
import { writeEvent } from "./writer";
import { getLastProcessedLedger, setLastProcessedLedger } from "./checkpoint";
import { log, logError } from "./logger";
import { getTrackedContractIds } from "./config";

const CONTRACT_IDS = getTrackedContractIds();

async function main() {
  log("Starting indexer...");

  const connected = await checkConnection();
  if (!connected) {
    logError("Could not connect to Soroban RPC. Exiting.");
    process.exit(1);
  }

  if (CONTRACT_IDS.length === 0) {
    logError("No TRACKED_CONTRACT_IDS set in .env. Exiting.");
    process.exit(1);
  }

  startPolling(async (latestLedger) => {
    const lastProcessed = await getLastProcessedLedger();
    const startLedger = lastProcessed ? Number(lastProcessed) + 1 : latestLedger - 10;

    const result = await fetchEventsForRange(startLedger, CONTRACT_IDS);

    for (const raw of result.events) {
      const decoded = mapRawEvent(raw);
      await writeEvent(decoded);
    }

    await setLastProcessedLedger(BigInt(latestLedger));
  });
}

main().catch((err) => {
  logError("Fatal error in indexer:", err);
  process.exit(1);
});