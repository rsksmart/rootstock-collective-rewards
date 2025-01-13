import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface TokenProgressProps {
  tokenAmount: number;
}

export function TokenProgress({ tokenAmount }: TokenProgressProps) {
  // Calculate level and progress
  const level = tokenAmount >= 200 ? 2 : tokenAmount >= 100 ? 1 : 0;
  const progress = Math.min((tokenAmount / 200) * 100, 100);

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Token Level</h3>
        <Badge variant="secondary">Level {level}</Badge>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>0 tokens</span>
        <span>100 tokens</span>
        <span>200 tokens</span>
      </div>
    </div>
  );
}
