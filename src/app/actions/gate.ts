import { stRIF } from "../utils/consts";
import { balanceOf } from "thirdweb/extensions/erc20";

export default async function hasAccess(address: string): Promise<boolean> {
  return await isMember(address);
}
async function isMember(address: string): Promise<boolean> {
  const balance = await balanceOf({
    contract: stRIF,
    address: address,
  });

  return balance > 0;
}
