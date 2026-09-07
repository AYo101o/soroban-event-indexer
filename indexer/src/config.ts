export function getTrackedContractIds(): string[] {
  const raw = process.env.TRACKED_CONTRACT_IDS || "";
  return raw.split(",").map((id) => id.trim()).filter(Boolean);
}