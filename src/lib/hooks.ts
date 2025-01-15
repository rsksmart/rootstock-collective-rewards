import { useEffect, useState } from "react";
import { legendContract, rootieContract } from "@/app/utils/consts";
import { Address, NFT } from "thirdweb";
import { balanceOf, getOwnedNFTs, getOwnedTokenIds } from "thirdweb/extensions/erc721";

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


export function useOwnedNFT({
  address,
  contract,
}: {
  address: Address | undefined;
  contract: typeof rootieContract | typeof legendContract;
}): { ownedNFTs: NFT[]; error: string | null } {
  const [ownedNFTs, setOwnedNFTs] = useState<NFT[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) {
      setOwnedNFTs([]);
      return;
    }

    const fetchOwnedNFTs = async () => {
      try {
        //const nfts = await getOwnedTokenIds({ contract, owner: address });
        const nfts = await getOwnedNFTs({ contract, owner: address });
        console.log(nfts)
        setOwnedNFTs(nfts);
      } catch (err) {
        console.error(`Error fetching owned NFTs for ${contract}:`, err);
        setError("Failed to fetch owned NFTs");
      }
    };

    fetchOwnedNFTs();
  }, [address, contract]);

  return { ownedNFTs, error };
}
