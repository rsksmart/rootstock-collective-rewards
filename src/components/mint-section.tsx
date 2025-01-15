'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { TransactionButton, useActiveAccount } from "thirdweb/react"
import { claimTo } from "thirdweb/extensions/erc721"
import { rootieContract, legendContract } from "@/app/utils/consts"

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

  const MintButton = ({ level }: { level: number }) => {
    const handleTransactionSent = (tx: any) => {
      console.log(`Minting Level ${level} NFT...`);
      console.log(tx);
    };

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
        onTransactionSent={handleTransactionSent}
        onTransactionConfirmed={handleTransactionConfirmed}
        onError={handleError}
        className="w-full"
      >
        Mint Level {level} NFT
      </TransactionButton>
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Available Mints</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {level >= 1 && <MintButton level={1} />}
        {level >= 2 && <MintButton level={2} />}
      </div>

      {level >= 1 && (
        <p className="text-sm text-gray-500 mt-2">
          You have {tokenAmount} tokens, qualifying you for Level {level} NFT minting.
        </p>
      )}
    </div>
  );
}

export default MintSection;