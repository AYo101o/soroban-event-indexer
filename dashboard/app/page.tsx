"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [contractId, setContractId] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contractId.trim()) {
      router.push(`/contract/${contractId.trim()}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 text-center">
      <h2 className="text-2xl font-bold mb-2">Track a Soroban contract</h2>
      <p className="text-gray-400 mb-6">
        Paste a contract ID to view its event history and activity.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={contractId}
          onChange={(e) => setContractId(e.target.value)}
          placeholder="CDCZSGV2K5MHVF5N4SN7AA36IUB6WZJCNIZFVB5PCFVSTF7WHNKGLW42"
          className="flex-1 bg-gray-900 border border-gray-700 rounded px-4 py-2 text-sm"
        />
        <button
          type="submit"
          className="bg-white text-black px-4 py-2 rounded font-medium"
        >
          View
        </button>
      </form>
    </div>
  );
}