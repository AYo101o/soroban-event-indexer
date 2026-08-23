import { prisma } from "./db";
import { DecodedEvent } from "./events";
import { log } from "./logger";

export async function writeEvent(event: DecodedEvent) {
  await prisma.event.create({
    data: {
      contractId: event.contractId,
      ledgerSeq: event.ledgerSeq,
      eventType: event.eventType,
      topics: event.topics as any,
      data: event.data as any,
      txHash: event.txHash,
    },
  });
  log(`Wrote event: ${event.eventType} (ledger ${event.ledgerSeq})`);
}