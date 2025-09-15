import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Zap, TrendingUp, Clock } from 'lucide-react';

interface TokenTrackerProps {
  tokensUsed: number;
}

export const TokenTracker = ({ tokensUsed }: TokenTrackerProps) => {
  const monthlyLimit = 50000;
  const usagePercentage = (tokensUsed / monthlyLimit) * 100;
  const estimatedCost = tokensUsed * 0.002;
  const remainingTokens = monthlyLimit - tokensUsed;

  return (
    <Card className="bg-gradient-card border-0 shadow-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          AI Token Usage
        </CardTitle>
        <CardDescription>Monthly consumption tracking</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Used this month</span>
            <span className="font-medium">{tokensUsed.toLocaleString()}</span>
          </div>
          <Progress 
            value={usagePercentage} 
            className="h-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0</span>
            <span>{monthlyLimit.toLocaleString()} limit</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-background/50 rounded-lg">
            <div className="text-2xl font-bold text-gradient-primary">
              ₹{estimatedCost.toFixed(0)}
            </div>
            <div className="text-xs text-muted-foreground">Estimated Cost</div>
          </div>
          <div className="text-center p-4 bg-background/50 rounded-lg">
            <div className="text-2xl font-bold text-gradient-gold">
              {remainingTokens.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Remaining</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Token Breakdown</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm">Voice Processing</span>
              </div>
              <span className="text-sm font-medium">2,100</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary-accent rounded-full" />
                <span className="text-sm">Image Analysis</span>
              </div>
              <span className="text-sm font-medium">1,850</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent-gold rounded-full" />
                <span className="text-sm">Text Generation</span>
              </div>
              <span className="text-sm font-medium">300</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>Resets in 18 days</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};