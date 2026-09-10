const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export interface StoredEvent {
  id: string;
  contractId: string;
  ledgerSeq: string;
  eventType: string;
  topics: unknown[];
  data: unknown;
  txHash: string;
  createdAt: string;
}

export async function fetchEvents(contractId: string): Promise<StoredEvent[]> {
  const res = await fetch(`${API_URL}/events?contractId=${encodeURIComponent(contractId)}`);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  const data = await res.json();
  return data.events;
}