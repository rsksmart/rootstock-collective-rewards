"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TokenProgress } from "@/components/token-progress";
import { MintSection } from "@/components/mint-section";
import { LoginButton } from "./LoginButton";

const levels = ["Unranked", "Rootie", "Legend"];

export default function Hero() {
  const [tokenAmount, setTokenAmount] = useState(0);
  const level = tokenAmount >= 200 ? 2 : tokenAmount >= 100 ? 1 : 0;

  // Demo function to cycle through token amounts
  const cycleTokenAmount = () => {
    setTokenAmount((current) => {
      if (current === 0) return 100;
      if (current === 100) return 200;
      return 0;
    });
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center grow">
      <section className="container px-4 md:px-6 flex flex-col items-center">
        <div className="mx-auto max-w-4xl space-y-12 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Exclusive NFT Collection
            </h1>
            <p className="mx-auto max-w-[600px] text-lg text-muted-foreground md:text-xl">
              Unlock exclusive NFTs with your tokens. The more tokens you hold,
              the more exclusive NFTs you can mint.
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
