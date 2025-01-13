import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface MintSectionProps {
  tokenAmount: number;
}

export function MintSection({ tokenAmount }: MintSectionProps) {
  const level = tokenAmount >= 200 ? 2 : tokenAmount >= 100 ? 1 : 0;

  if (level === 0) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Not Eligible</AlertTitle>
        <AlertDescription>
          You need at least 100 tokens to mint an NFT. Purchase more tokens to
          unlock minting capabilities.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Available Mints</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {level >= 1 && (
          <Button className="w-full" size="lg">
            Mint Level 1 NFT
          </Button>
        )}
        {level >= 2 && (
          <Button className="w-full" size="lg" variant="secondary">
            Mint Level 2 NFT
          </Button>
        )}
      </div>
    </div>
  );
}
