import { stRIF } from "../utils/consts";
import { balanceOf } from "thirdweb/extensions/erc20";

/**
 * Checks if the given address has access to the exclusive content.
 * @param address - The user's wallet address.
 * @returns A boolean indicating if the address has access.
 */
export default async function hasAccess(address: string): Promise<any> {
  return await isMember(address);
}
/**
 * Checks if the given address has access to the exclusive content.
 * @param address - The user's wallet address.
 * @returns A boolean indicating if the address has access.
 */
async function isMember(address: string): Promise<any> {
  const balance = await balanceOf({
    contract: stRIF,
    address: address,
  });

  return {
    amount: balance,
    isMember: balance > 0,
  };
}
