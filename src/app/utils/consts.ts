import { defineChain, getContract, NATIVE_TOKEN_ADDRESS } from "thirdweb";
import { client } from "./client";

export const rootstockTestnet = defineChain({
  id: 31,
  rpc: "https://public-node.testnet.rsk.co",
  nativeCurrency: {
    name: "TRBTC",
    symbol: "TRBTC",
    decimals: 18,
  },
});

export const TRBTC = getContract({
  client,
  chain: rootstockTestnet,
  address: NATIVE_TOKEN_ADDRESS,
});

export const stRIF = getContract({
  client: client,
  chain: rootstockTestnet,
  address: "0xCacB5872A030d1a0Ca9267FA2AE87b4baE9D90fC", 
});
