"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function VolumeChart({ data }: { data: { date: string; count: number }[] }) {
  if (data.length === 0) {
    return <p className="text-gray-500 text-sm">Not enough data yet.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="date" stroke="#666" fontSize={12} />
        <YAxis stroke="#666" fontSize={12} allowDecimals={false} />
        <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }} />
        <Line type="monotone" dataKey="count" stroke="#fff" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}