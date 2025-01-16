"use client";

import { useEffect, useState } from "react";
import { TokenProgress } from "@/components/token-progress";
import { MintSection } from "@/components/mint-section";
import { LoginButton } from "./LoginButton";
import { useActiveAccount } from "thirdweb/react";
import { Address, toEther } from "thirdweb";
import hasAccess from "@/app/actions/gate";

const levels = ["Unranked", "Rootie", "Legend"];

export default function Hero() {
  const activeAccount = useActiveAccount();
  const [tokenAmount, setTokenAmount] = useState<number>(0);

  useEffect(() => {
    const fetchMembershipStatus = async () => {
      if (activeAccount) {
        try {
          const membershipStatus = await hasAccess(
            activeAccount?.address as Address
          );
          const amountInEther = toEther(membershipStatus.amount);
          const parsedAmount = parseFloat(amountInEther);
          setTokenAmount(parsedAmount);
        } catch (error) {
          console.error("Failed to fetch membership status:", error);
        }
      }
    };

    fetchMembershipStatus();
  }, [activeAccount]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center grow">
      <section className="container px-4 md:px-6 flex flex-col items-center">
        <div className="mx-auto max-w-4xl space-y-12 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-black">
              Rootstock Collective Rewards
            </h1>
            <p className="mx-auto max-w-[600px] text-lg md:text-xl text-black/80">
              Unlock exclusive NFTs based on your stRIF tokens. The more tokens
              you hold, the more exclusive NFTs you can mint.
            </p>
          </div>

          <LoginButton />

          {/* Token Progress Section */}
          <div className="mx-auto max-w-lg space-y-8 rounded-xl border bg-card p-6 shadow-lg">
            <TokenProgress tokenAmount={tokenAmount} />
            <MintSection tokenAmount={tokenAmount} />
          </div>
        </div>
      </section>
    </div>
  );
}
