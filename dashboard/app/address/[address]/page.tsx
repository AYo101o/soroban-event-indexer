import Link from "next/link";
import { fetchEventsByAddress } from "@/lib/api";
import EventList from "@/components/EventList";

export default async function AddressPage({
  params,
}: {
  params: Promise<{ address: string }>;
}) {
  const { address } = await params;

  let events;
  let error = null;
  try {
    events = await fetchEventsByAddress(address);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load events";
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/" className="text-sm text-gray-500 hover:text-white mb-4 inline-block">
        ← Back
      </Link>
      <h2 className="text-xl font-semibold mb-1">Address Activity</h2>
      <p className="text-gray-500 text-sm mb-6 font-mono break-all">{address}</p>
      {error ? (
        <p className="text-red-400">{error}</p>
      ) : (
        <EventList events={events || []} />
      )}
    </div>
  );
}