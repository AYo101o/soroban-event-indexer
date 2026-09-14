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

export async function getTopAddresses(contractId: string, limit = 10) {
  const events = await prisma.event.findMany({
    where: { contractId },
    select: { topics: true },
  });

  const counts: Record<string, number> = {};
  for (const event of events) {
    const topics = event.topics as unknown[];
    for (const topic of topics) {
      if (typeof topic === "string" && topic.startsWith("G") && topic.length === 56) {
        counts[topic] = (counts[topic] || 0) + 1;
      }
    }
  }

  return Object.entries(counts)
    .map(([address, count]) => ({ address, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}