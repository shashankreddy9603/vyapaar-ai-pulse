import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Package, Users, IndianRupee, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MetricsCardsProps {
  metrics: {
    totalRevenue: number;
    ordersToday: number;
    activeCustomers: number;
    aiTokensUsed: number;
  };
}

export const MetricsCards = ({ metrics }: MetricsCardsProps) => {
  const [animatedMetrics, setAnimatedMetrics] = useState(metrics);

  useEffect(() => {
    // Animate counter changes
    const duration = 1000;
    const steps = 60;
    const stepDuration = duration / steps;

    Object.keys(metrics).forEach((key) => {
      const targetValue = metrics[key as keyof typeof metrics];
      const currentValue = animatedMetrics[key as keyof typeof metrics];
      const difference = targetValue - currentValue;
      const stepValue = difference / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        if (currentStep >= steps) {
          clearInterval(timer);
          setAnimatedMetrics(prev => ({ ...prev, [key]: targetValue }));
        } else {
          setAnimatedMetrics(prev => ({
            ...prev,
            [key]: Math.round(currentValue + (stepValue * currentStep))
          }));
        }
      }, stepDuration);
    });
  }, [metrics]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-gradient-card border-0 shadow-primary hover-lift">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Revenue
          </CardTitle>
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <IndianRupee className="h-4 w-4 text-primary-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gradient-primary animate-counter">
            {formatCurrency(animatedMetrics.totalRevenue)}
          </div>
          <p className="text-xs text-success flex items-center mt-1">
            <TrendingUp className="w-3 h-3 mr-1" />
            +12.5% from last month
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-0 shadow-secondary hover-lift">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Orders Today
          </CardTitle>
          <div className="w-8 h-8 bg-gradient-secondary rounded-lg flex items-center justify-center">
            <Package className="h-4 w-4 text-secondary-accent" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-secondary-accent animate-counter">
            {animatedMetrics.ordersToday}
          </div>
          <p className="text-xs text-success flex items-center mt-1">
            <TrendingUp className="w-3 h-3 mr-1" />
            +8% from yesterday
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-0 shadow-elegant hover-lift">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Active Customers
          </CardTitle>
          <div className="w-8 h-8 bg-gradient-gold rounded-lg flex items-center justify-center">
            <Users className="h-4 w-4 text-accent-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gradient-gold animate-counter">
            {animatedMetrics.activeCustomers}
          </div>
          <p className="text-xs text-success flex items-center mt-1">
            <TrendingUp className="w-3 h-3 mr-1" />
            +23 new this week
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-0 shadow-glow hover-lift">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            AI Tokens Used
          </CardTitle>
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gradient-primary animate-counter">
            {animatedMetrics.aiTokensUsed.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            ≈ ₹{Math.round(animatedMetrics.aiTokensUsed * 0.002)} cost
          </p>
        </CardContent>
      </Card>
    </div>
  );
};