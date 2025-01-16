import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { NFTDescription, NFTMedia, NFTName, NFTProvider, TransactionButton, useActiveAccount } from "thirdweb/react";
import { claimTo, getNFTs, getOwnedNFTs } from "thirdweb/extensions/erc721";
import { rootieContract, legendContract, rootstockTestnet } from "@/app/utils/consts";
import { toast } from "sonner";
import { waitForReceipt } from "thirdweb/transaction";
import { extractErrorMessages } from "@/lib/error";
import { client } from "@/app/utils/client";
import { useEffect, useState } from "react";
import { useHasLegendNFT, useHasRootieNFT } from "@/lib/hooks";

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
  const address = account?.address;
  const [txInProgress, setTxInProgress] = useState(false);
  const hasRootieNFT = useHasRootieNFT({ address });
  const hasLegendNFT = useHasLegendNFT({ address });
  useEffect(() => {
    // Fetch owned NFTs when the address is available
    if (address) {
      const fetchRootie = async () => {
        try {
          const nfts = await getNFTs({
            contract: rootieContract,
            start: 0,
            count: 110,
          });
          console.log("Rootie NFTs:", nfts); // Store the fetched NFTs
        } catch (error) {
          console.error("Error fetching Rootie NFTs:", error);
        }
      };
      fetchRootie();
  
      const fetchLegend = async () => {
        try {
          const nfts = await getNFTs({
            contract: legendContract,
            start: 0,
            count: 110,
          });
          console.log("Legend NFTs:", nfts); // Store the fetched NFTs
        } catch (error) {
          console.error("Error fetching Legend NFTs:", error);
        }
      };
      fetchLegend();
  
      const fetchOwnedRootie = async () => {
        try {
          const nfts = await getOwnedNFTs({
            contract: rootieContract, // You should fetch from rootieContract here as you seem to be fetching owned rooties
            owner: address as string,
          });
          console.log("Owned Rootie NFTs:", nfts); // Store the fetched NFTs
        } catch (error) {
          console.error("Error fetching owned Rootie NFTs:", error);
        }
      };
      fetchOwnedRootie();
  
      const fetchOwnedLegend = async () => {
        try {
          const nfts = await getOwnedNFTs({
            contract: legendContract,
            owner: address as string,
          });
          console.log("Owned Legend NFTs:", nfts); // Store the fetched NFTs
        } catch (error) {
          console.error("Error fetching owned Legend NFTs:", error);
        }
      };
      fetchOwnedLegend();
    }
  }, [address]); // Fetch NFTs whenever the address changes
  

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
      {/* Container for grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Rootie NFT Section */}
        <div className="space-y-4">
          {!hasRootieNFT && level >= 1 && (
            <>
              <h3 className="text-lg font-semibold">Rootie Mint</h3>
              <MintButton disabled={txInProgress} level={1} />
            </>
          )}
          {hasRootieNFT && (
            <>
              <h3 className="text-lg font-semibold">My Rootie NFT</h3>
              <div className="border p-4 rounded-lg">
                <NFTProvider contract={rootieContract} tokenId={4n}>
                  <NFTName />
                  <NFTMedia />
                  <NFTDescription />
                </NFTProvider>
              </div>
            </>
          )}
        </div>

        {/* Legend NFT Section */}
        <div className="space-y-4">
          {!hasLegendNFT && level >= 2 && (
            <>
              <h3 className="text-lg font-semibold">Legend Mint</h3>
              <MintButton disabled={txInProgress} level={2} />
            </>
          )}
          {hasLegendNFT && (
            <>
              <h3 className="text-lg font-semibold">My Legend NFT</h3>
              <div className="border p-4 rounded-lg">
                <NFTProvider contract={legendContract} tokenId={4n}>
                  <NFTName />
                  <NFTMedia />
                </NFTProvider>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Display Token Info */}
      {level >= 1 && (
        <p className="text-sm text-gray-500 mt-2">
          You have {tokenAmount} tokens, qualifying you for Level {level} NFT minting.
        </p>
      )}
    </div>
  );
}

export default MintSection;
