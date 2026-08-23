import { rpc } from "@stellar/stellar-sdk";
import * as dotenv from "dotenv";

dotenv.config();

const RPC_URL = process.env.SOROBAN_RPC_URL || "https://soroban-testnet.stellar.org";

export const server = new rpc.Server(RPC_URL);

export async function checkConnection(): Promise<boolean> {
  try {
    const health = await server.getHealth();
    console.log("RPC health:", health.status);
    return health.status === "healthy";
  } catch (err) {
    console.error("RPC connection failed:", err);
    return false;
  }
}