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
      <Progress value={progress} className="h-2 w-[90%] mx-auto" />
      <div className="flex justify-between ">
        <div className="flex flex-col items-center ">
          <span
            className={progress < 50 ? "text-orange-500" : "text-orange-500/60"}
          >
            Unranked
          </span>
          <span className="text-sm text-muted-foreground">0 tokens</span>
        </div>
        <div className="flex flex-col items-center ">
          <span
            className={
              progress >= 50 && progress < 100
                ? "text-orange-500"
                : progress < 50
                ? "text-foreground"
                : "text-orange-500/60"
            }
          >
            Rootie
          </span>
          <span className="text-sm text-muted-foreground">≥100 tokens</span>
        </div>
        <div className="flex flex-col items-center ">
          <span
            className={progress >= 100 ? "text-orange-500" : "text-foreground"}
          >
            Legend
          </span>
          <span className="text-sm text-muted-foreground">≥200 tokens</span>
        </div>
      </div>
    </div>
  );
}
