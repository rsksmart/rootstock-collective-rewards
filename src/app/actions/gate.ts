import { stRIF } from "../utils/consts";
import { balanceOf } from "thirdweb/extensions/erc20";

/**
 * Checks if the given address has access to the exclusive content.
 * @param address - The user's wallet address.
 * @returns An object containing the `isMember` status and the `amount` of tokens.
 */
export default async function hasAccess(address: string): Promise<{ isMember: boolean; amount: bigint }> {
  const balance = await balanceOf({
    contract: stRIF,
    address: address,
  });
  return {
    amount: balance,
    isMember: balance > 0,
  };
}
