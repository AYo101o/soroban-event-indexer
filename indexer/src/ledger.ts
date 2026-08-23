import { server } from "./rpc";

export async function getLatestLedgerSeq(): Promise<number> {
  const latest = await server.getLatestLedger();
  return latest.sequence;
}