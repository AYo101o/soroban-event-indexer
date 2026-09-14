import { prisma } from "../db";

export async function getVolumeOverTime(contractId: string) {
  const events = await prisma.event.findMany({
    where: { contractId },
    select: { createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  const buckets: Record<string, number> = {};
  for (const event of events) {
    const parts = event.createdAt.toISOString().split("T");
    const day = parts[0];
    if (typeof day !== "string") continue;
    buckets[day] = (buckets[day] ?? 0) + 1;
  }

  return Object.entries(buckets).map(([date, count]) => ({ date, count }));
}