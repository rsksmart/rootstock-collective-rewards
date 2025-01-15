import { useEffect, useState } from "react";
import { legendContract, rootieContract } from "@/app/utils/consts";
import { Address } from "thirdweb";
import { balanceOf } from "thirdweb/extensions/erc721";

export function useHasRootieNFT({
  address,
}: {
  address: string | undefined;
}): boolean {
  const [hasNFT, setHasNFT] = useState(false);

  useEffect(() => {
    if (!address) {
      setHasNFT(false);
      return;
    }

    const fetchBalance = async () => {
      try {
        const result = await balanceOf({
          contract: rootieContract,
          owner: address as Address,
        });
        setHasNFT(result > 0);
      } catch (error) {
        console.error("Error fetching RootieNFT balance:", error);
        setHasNFT(false);
      }
    };

    fetchBalance();
  }, [address]);

  return hasNFT;
}

export function useHasLegendNFT({
  address,
}: {
  address: string | undefined;
}): boolean {
  const [hasNFT, setHasNFT] = useState(false);

  useEffect(() => {
    if (!address) {
      setHasNFT(false);
      return;
    }

    const fetchBalance = async () => {
      try {
        const result = await balanceOf({
          contract: legendContract,
          owner: address as Address,
        });
        setHasNFT(result > 0);
      } catch (error) {
        console.error("Error fetching LegendNFT balance:", error);
        setHasNFT(false);
      }
    };

    fetchBalance();
  }, [address]);

  return hasNFT;
}
