import { fetchEvents } from "@/lib/api";
import EventList from "@/components/EventList";

export default async function ContractPage({
  params,
}: {
  params: Promise<{ contractId: string }>;
}) {
  const { contractId } = await params;

  let events;
  let error = null;
  try {
    events = await fetchEvents(contractId);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load events";
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-1">Contract Activity</h2>
      <p className="text-gray-500 text-sm mb-6 font-mono break-all">{contractId}</p>
      {error ? (
        <p className="text-red-400">{error}</p>
      ) : (
        <EventList events={events || []} />
      )}
    </div>
  );
}