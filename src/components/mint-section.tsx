"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { NFTMedia, NFTProvider, TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { claimTo, getNFTs, getOwnedNFTs, getOwnedTokenIds } from "thirdweb/extensions/erc721";
import {
  rootieContract,
  legendContract,
  rootstockTestnet,
} from "@/app/utils/consts";
import { toast } from "sonner";
import { waitForReceipt } from "thirdweb/transaction";
import { extractErrorMessages } from "@/lib/error";
import { client } from "@/app/utils/client";
import { useEffect, useState } from "react";
import { useHasLegendNFT, useHasRootieNFT, useOwnedNFT } from "@/lib/hooks";
import { Address } from "thirdweb";


interface MintSectionProps {
  tokenAmount: number;
}

const LEVEL_THRESHOLDS = {
  LEVEL_2: {
    amount: 200,
    contract: 'Legend',
  },
  LEVEL_1: {
    amount: 100,
    contract: 'Rootie',
  },
} as const;

export function MintSection({ tokenAmount }: MintSectionProps) {
  const account = useActiveAccount();
  const address = account?.address as Address;
  const [txInProgress, setTxInProgress] = useState(false);
  //const [nfts, setNfts] = useState<any[]>([]);
  const hasRootieNFT = useHasRootieNFT({ address });
  const hasLegendNFT = useHasLegendNFT({ address });
  console.log('hasRootieNFT',hasRootieNFT)
  console.log('hasLegendNFT',hasLegendNFT)
  /**
   * Custom hook using getOwnedTokenIds.
   *
   */
  const rootie = useOwnedNFT({address:address, contract: rootieContract })
  console.log('Custom hook',rootie)
   /**
   * Fetches the owned NFTs as suggested for react hooks and extensions
   *
   *  
   */

  const ownedNFTs = useReadContract(getOwnedNFTs, {
    contract: rootieContract,
    owner: address
  });
  console.log('hook + extension',ownedNFTs.data)

  const getLevel = (amount: number) => {
    if (amount >= LEVEL_THRESHOLDS.LEVEL_2.amount) return 2;
    if (amount >= LEVEL_THRESHOLDS.LEVEL_1.amount) return 1;
    return 0;
  };

  const level = getLevel(tokenAmount);

  const nftCollection = level === 1 ? "Rootie" : "Legend";

  if (!address) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Wallet Not Connected</AlertTitle>
        <AlertDescription>
          Please connect your wallet to access NFT minting.
        </AlertDescription>
      </Alert>
    );
  }

  if (level === 0) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Not Eligible</AlertTitle>
        <AlertDescription>
          You need at least {LEVEL_THRESHOLDS.LEVEL_1.amount} tokens to mint an NFT.
          You currently have {tokenAmount} tokens.
        </AlertDescription>
      </Alert>
    );
  }

  const MintButton = ({
    level,
    disabled,
  }: {
    level: number;
    disabled: boolean;
  }) => {
    const handleTransactionConfirmed = async (tx: any) => {
      console.log(`NFT Minted Successfully!`);
      console.log(tx);
    };

    const handleError = (error: Error) => {
      console.error(`Error minting NFT:`, error);
    };

    return (
      <TransactionButton
        transaction={() =>
          claimTo({
            contract: level === 1 ? rootieContract : legendContract,
            to: address,
            quantity: BigInt(1),
          })
        }
        onTransactionSent={(result) => {
          setTxInProgress(true);
          console.log(result.transactionHash);
          toast.promise(
            async () =>
              await waitForReceipt({
                client: client,
                chain: rootstockTestnet,
                transactionHash: result.transactionHash,
              }),
            {
              loading: "Waiting for confirmation…",
              action: {
                label: "Explorer",
                onClick(e) {
                  e.preventDefault();
                  window.open(
                    `https://explorer.testnet.rootstock.io/tx/${result.transactionHash}`,
                    "_blank"
                  );
                },
              },
              success: "Tickets have been purchased!",
              error(error) {
                const { message } = extractErrorMessages(error);
                return message;
              },
              finally: () => {
                setTxInProgress(false);
              },
            }
          );
        }}
        onTransactionConfirmed={handleTransactionConfirmed}
        onError={handleError}
        disabled={disabled}
        className="w-full"
      >
        Mint {nftCollection} NFT
      </TransactionButton>
    );
  };

  return (
    <div className="space-y-4">
      {!hasLegendNFT && !hasRootieNFT && (
        <>
          <h3 className="text-lg font-semibold">Available Mints</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {level >= 1 && !hasRootieNFT && (
              <MintButton disabled={txInProgress} level={1} />
            )}
            {level >= 2 && !hasLegendNFT && (
              <MintButton disabled={txInProgress} level={2} />
            )}
          </div>
        </>
      )}

      {level >= 1 && (
        <p className="text-sm text-gray-500 mt-2">
          You have {tokenAmount} tokens, qualifying you for Level {nftCollection} NFT
          minting.
        </p>
      )}
    </div>
  );
}

export default MintSection;
