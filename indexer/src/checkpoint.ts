import { prisma } from "./db";

const CHECKPOINT_ID = "singleton";

export async function getLastProcessedLedger(): Promise<bigint | null> {
  const state = await prisma.indexerState.findUnique({
    where: { id: CHECKPOINT_ID },
  });
  return state?.lastLedgerSeq ?? null;
}

export async function setLastProcessedLedger(ledgerSeq: bigint) {
  await prisma.indexerState.upsert({
    where: { id: CHECKPOINT_ID },
    update: { lastLedgerSeq: ledgerSeq },
    create: { id: CHECKPOINT_ID, lastLedgerSeq: ledgerSeq },
  });
}