"use client";

import { useReadContract } from "thirdweb/react";
import { Address } from "thirdweb";
import { balanceOf } from "thirdweb/extensions/erc20";
import { useActiveAccount } from "thirdweb/react";
import { TRBTC } from "./utils/consts";
import { LoginButton } from "./components/LoginButton";
import hasAccess from "./actions/gate";

export default function Home() {
  const activeAccount = useActiveAccount()?.address;

  const balance = useReadContract(balanceOf, {
    contract: TRBTC,
    address: activeAccount as Address,
  });

  // Simple debug log
  if (activeAccount) {
    hasAccess(activeAccount as Address).then(console.log);
  }

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20">
        <div className="flex justify-center mb-20">
          <LoginButton />
        </div>

        {/* Display Balance */}
        {balance.data && (
          <div className="text-center mt-4">
            Balance: {balance.data.toString()}
          </div>
        )}
      </div>
    </main>
  );
}
