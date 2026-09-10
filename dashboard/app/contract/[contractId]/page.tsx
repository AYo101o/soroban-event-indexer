import Link from "next/link";
import { fetchEvents } from "@/lib/api";
import EventList from "@/components/EventList";
import LiveEventList from "@/components/LiveEventList";

export default async function ContractPage({
  params,
}: {
  params: Promise<{ contractId: string }>;
}) {
  const { contractId } = await params;

  return (
    <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm text-gray-500 hover:text-white mb-4 inline-block">
            ← Back
        </Link>
      <h2 className="text-xl font-semibold mb-1">Contract Activity</h2>
      <p className="text-gray-500 text-sm mb-6 font-mono break-all">{contractId}</p>
      <LiveEventList contractId={contractId} />
    </div>
  );
}

