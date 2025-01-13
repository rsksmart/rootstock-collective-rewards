"use client";

import { useReadContract } from "thirdweb/react";
import { Address } from "thirdweb";
import { balanceOf } from "thirdweb/extensions/erc20";
import { useActiveAccount } from "thirdweb/react";
import { stRIF, TRBTC } from "./utils/consts";
import { LoginButton } from "../components/LoginButton";
import isMember from "./actions/gate";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  const activeAccount = useActiveAccount()?.address;
  const balance = useReadContract(balanceOf, {
    contract: stRIF,
    address: activeAccount as Address,
  });

  // Simple debug log
  if (activeAccount) {
    isMember(activeAccount as Address).then(console.log);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-svh">
      <Hero />
      <Footer />
    </main>
  );
}
