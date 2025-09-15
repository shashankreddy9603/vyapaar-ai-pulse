import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  BarChart3, 
  Package, 
  Zap, 
  Mic, 
  Camera, 
  Send,
  TrendingUp,
  Users,
  IndianRupee,
  Sparkles
} from 'lucide-react';
import { MetricsCards } from '@/components/dashboard/MetricsCards';
import { InventoryTable } from '@/components/dashboard/InventoryTable';
import { AIChat } from '@/components/dashboard/AIChat';
import { WhatsAppSimulator } from '@/components/dashboard/WhatsAppSimulator';
import { TokenTracker } from '@/components/dashboard/TokenTracker';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [metrics, setMetrics] = useState({
    totalRevenue: 125000,
    ordersToday: 23,
    activeCustomers: 156,
    aiTokensUsed: 4250
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 1000),
        ordersToday: prev.ordersToday + Math.floor(Math.random() * 2),
        aiTokensUsed: prev.aiTokensUsed + Math.floor(Math.random() * 50)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient-primary">VyaapaarAI</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Commerce Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-gradient-gold text-accent-foreground">
                <Zap className="w-4 h-4 mr-1" />
                Pro Plan
              </Badge>
              <Button variant="outline" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Rajesh Kumar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, Rajesh!</h2>
          <p className="text-muted-foreground">Here's what's happening with your business today.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="ai-chat" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="whatsapp" className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              WhatsApp
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <MetricsCards metrics={metrics} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="bg-gradient-card border-0 shadow-elegant">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription>Latest interactions and updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-background/50 rounded-lg">
                        <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center">
                          <Mic className="w-5 h-5 text-secondary-accent" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Voice message processed</p>
                          <p className="text-sm text-muted-foreground">Added 5 sarees to inventory - 2 minutes ago</p>
                        </div>
                        <Badge variant="secondary">Processed</Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 bg-background/50 rounded-lg">
                        <div className="w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center">
                          <Camera className="w-5 h-5 text-accent-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Product photos analyzed</p>
                          <p className="text-sm text-muted-foreground">Generated pricing for kurta sets - 5 minutes ago</p>
                        </div>
                        <Badge variant="secondary">Completed</Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 bg-background/50 rounded-lg">
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Marketing poster created</p>
                          <p className="text-sm text-muted-foreground">Diwali special promotion - 8 minutes ago</p>
                        </div>
                        <Badge className="bg-gradient-primary text-primary-foreground">Generated</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <TokenTracker tokensUsed={metrics.aiTokensUsed} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="inventory">
            <InventoryTable />
          </TabsContent>

          <TabsContent value="ai-chat">
            <AIChat />
          </TabsContent>

          <TabsContent value="whatsapp">
            <WhatsAppSimulator />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;