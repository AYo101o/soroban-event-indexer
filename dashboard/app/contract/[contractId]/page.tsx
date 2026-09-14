import Link from "next/link";
import { fetchAnalytics } from "@/lib/api";
import LiveEventList from "@/components/LiveEventList";
import VolumeChart from "@/components/VolumeChart";
import TopAddressesChart from "@/components/TopAddressesChart";

export default async function ContractPage({
  params,
}: {
  params: Promise<{ contractId: string }>;
}) {
  const { contractId } = await params;

  let analytics = null;
  try {
    analytics = await fetchAnalytics(contractId);
  } catch {
    // analytics is optional — page still works without it
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/" className="text-sm text-gray-500 hover:text-white mb-4 inline-block">
        ← Back
      </Link>
      <h2 className="text-xl font-semibold mb-1">Contract Activity</h2>
      <p className="text-gray-500 text-sm mb-6 font-mono break-all">{contractId}</p>

      {analytics && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="border border-gray-800 rounded p-4">
            <h3 className="text-sm text-gray-400 mb-2">Volume Over Time</h3>
            <VolumeChart data={analytics.volumeOverTime} />
          </div>
          <div className="border border-gray-800 rounded p-4">
            <h3 className="text-sm text-gray-400 mb-2">Top Addresses</h3>
            <TopAddressesChart data={analytics.topAddresses} />
          </div>
        </div>
      )}

      <LiveEventList contractId={contractId} />
    </div>
  );
}