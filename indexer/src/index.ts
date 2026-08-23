import { checkConnection } from "./rpc";
import { getLatestLedgerSeq } from "./ledger";
import { log, logError } from "./logger";

async function main() {
  log("Starting indexer...");

  const connected = await checkConnection();
  if (!connected) {
    logError("Could not connect to Soroban RPC. Exiting.");
    process.exit(1);
  }

  const latestLedger = await getLatestLedgerSeq();
  log(`Latest ledger sequence: ${latestLedger}`);
}

main().catch((err) => {
  logError("Fatal error in indexer:", err);
  process.exit(1);
});