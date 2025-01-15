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

export const rootieContract = getContract({
  client: client,
  chain: rootstockTestnet,
  address: "0x683AA67632c67d1Ff86FB475FC995E554E8E2AAd",
});


export const legendContract = getContract({
  client: client,
  chain: rootstockTestnet,
  address: "0xd013E82A3EE8882B011631F3C86c279559ab53bf",
});