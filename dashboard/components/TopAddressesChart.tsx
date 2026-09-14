"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function TopAddressesChart({
  data,
}: {
  data: { address: string; count: number }[];
}) {
  if (data.length === 0) {
    return <p className="text-gray-500 text-sm">No address activity yet.</p>;
  }

  const chartData = data.map((d) => ({
    ...d,
    shortAddress: `${d.address.slice(0, 4)}...${d.address.slice(-4)}`,
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="shortAddress" stroke="#666" fontSize={12} />
        <YAxis stroke="#666" fontSize={12} allowDecimals={false} />
        <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }} />
        <Bar dataKey="count" fill="#fff" />
      </BarChart>
    </ResponsiveContainer>
  );
}