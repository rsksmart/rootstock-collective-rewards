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
