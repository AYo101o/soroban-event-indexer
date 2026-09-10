import { StoredEvent } from "@/lib/api";

export default function EventList({ events }: { events: StoredEvent[] }) {
  if (events.length === 0) {
    return (
      <p className="text-gray-500 text-sm">
        No events captured yet for this contract.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {events.map((event) => (
        <div
          key={event.id}
          className="border border-gray-800 rounded p-4 text-sm"
        >
          <div className="flex justify-between mb-2">
            <span className="font-medium">{event.eventType}</span>
            <span className="text-gray-500">Ledger {event.ledgerSeq}</span>
          </div>
          <p className="text-gray-500 font-mono text-xs break-all">
            {event.txHash}
          </p>
        </div>
      ))}
    </div>
  );
}