"use client";

import { useEffect, useState } from "react";
import { fetchEvents, StoredEvent } from "@/lib/api";
import EventList from "./EventList";

export default function LiveEventList({ contractId }: { contractId: string }) {
  const [events, setEvents] = useState<StoredEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data = await fetchEvents(contractId);
        if (active) {
          setEvents(data);
          setError(null);
        }
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    const interval = setInterval(load, 10000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [contractId]);

  if (loading) return <p className="text-gray-500 text-sm">Loading events...</p>;
  if (error) return <p className="text-red-400 text-sm">{error}</p>;

  return <EventList events={events} />;
}