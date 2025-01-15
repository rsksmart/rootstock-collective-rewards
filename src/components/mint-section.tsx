"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { claimTo } from "thirdweb/extensions/erc721";
import {
  rootieContract,
  legendContract,
  rootstockTestnet,
} from "@/app/utils/consts";
import { toast } from "sonner";
import { waitForReceipt, WaitForReceiptOptions } from "thirdweb/transaction";
import { extractErrorMessages } from "@/lib/error";
import { client } from "@/app/utils/client";
import { useState } from "react";
import { useHasLegendNFT, useHasRootieNFT } from "@/lib/hooks";

interface MintSectionProps {
  tokenAmount: number;
}

const LEVEL_THRESHOLDS = {
  LEVEL_2: 200,
  LEVEL_1: 100,
} as const;

export function MintSection({ tokenAmount }: MintSectionProps) {
  const account = useActiveAccount();
  const address = account?.address;
  const [txInProgress, setTxInProgress] = useState(false);
  const hasRootieNFT = useHasRootieNFT({ address });
  const hasLegendNFT = useHasLegendNFT({ address });

  const getLevel = (amount: number) => {
    if (amount >= LEVEL_THRESHOLDS.LEVEL_2) return 2;
    if (amount >= LEVEL_THRESHOLDS.LEVEL_1) return 1;
    return 0;
  };

  const level = getLevel(tokenAmount);

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
          You need at least {LEVEL_THRESHOLDS.LEVEL_1} tokens to mint an NFT.
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
      console.log(`Level ${level} NFT Minted Successfully!`);
      console.log(tx);
    };

    const handleError = (error: Error) => {
      console.error(`Error minting Level ${level} NFT:`, error);
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
          console.log(`Minting Level ${level} NFT...`);
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
        Mint Level {level} NFT
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

      {(hasLegendNFT || hasRootieNFT) && (
        <>
          <h3 className="text-lg font-semibold">My NFTs</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* TODO: Add NFTs with Media Render */}
            {/* {hasRootieNFT && <MintButton disabled={txInProgress} level={1} />}
            {hasLegendNFT && <MintButton disabled={txInProgress} level={2} />} */}
          </div>
        </>
      )}

      {level >= 1 && (
        <p className="text-sm text-gray-500 mt-2">
          You have {tokenAmount} tokens, qualifying you for Level {level} NFT
          minting.
        </p>
      )}
    </div>
  );
}

export default MintSection;
