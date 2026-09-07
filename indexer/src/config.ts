export function getTrackedContractIds(): string[] {
  const raw = process.env.TRACKED_CONTRACT_IDS || "";
  return raw.split(",").map((id) => id.trim()).filter(Boolean);
}

export function validateConfig() {
  const required = ["DATABASE_URL", "POOLED_DATABASE_URL", "SOROBAN_RPC_URL", "TRACKED_CONTRACT_IDS"];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required env vars: ${missing.join(", ")}`);
  }
}