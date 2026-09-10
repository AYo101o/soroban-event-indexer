import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soroban Event Indexer",
  description: "Real-time indexing and analytics for Soroban smart contracts on Stellar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <header className="border-b border-gray-800 px-4 sm:px-6 py-4">
          <h1 className="text-lg font-semibold">Soroban Event Indexer</h1>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
} 