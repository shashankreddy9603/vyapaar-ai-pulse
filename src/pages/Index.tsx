import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Mic, Camera, MessageSquare, BarChart3, Zap, Check, Sparkles, Globe, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Mic,
      title: "Voice Input in Vernacular",
      description: "Process voice messages in Telugu, Hindi, and Hinglish with AI-powered transcription",
      color: "primary"
    },
    {
      icon: Camera,
      title: "Smart Photo Analysis",
      description: "Automatically identify products and generate pricing from uploaded images",
      color: "secondary"
    },
    {
      icon: MessageSquare,
      title: "WhatsApp Integration",
      description: "Send stock updates and promotional offers directly through WhatsApp",
      color: "accent"
    },
    {
      icon: BarChart3,
      title: "Real-time Dashboard",
      description: "Track inventory, sales, and AI usage with live Google Sheets sync",
      color: "primary"
    }
  ];

  const benefits = [
    "Reduce inventory management time by 80%",
    "Increase customer engagement with automated responses",
    "Generate professional marketing materials instantly",
    "Support for local Indian languages",
    "Real-time synchronization with Google Sheets",
    "Advanced AI-powered business insights"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
              <Sparkles className="w-4 h-4 mr-2" />
              Powered by Advanced AI
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary-foreground">
              VyaapaarAI
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-4">
              AI-Powered Conversational Commerce
            </p>
            
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Transform your kirana store with voice + photo WhatsApp inputs, automated inventory management, and instant stock availability updates for customers
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-elegant hover-lift text-lg px-8 py-6"
              >
                <Link to="/auth">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for <span className="text-gradient-primary">Indian MSMEs</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Harness the power of AI to streamline your business operations with familiar WhatsApp interactions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-gradient-card border-0 shadow-elegant hover-lift group"
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-${feature.color} rounded-2xl flex items-center justify-center group-hover:shadow-glow transition-all duration-300`}>
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose <span className="text-gradient-gold">VyaapaarAI</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Designed specifically for Indian small and medium businesses, with support for local languages and business practices.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <Card className="bg-gradient-card border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-primary-foreground" />
                    </div>
                    Live Demo Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gradient-primary mb-2">₹1,25,000</div>
                    <div className="text-sm text-muted-foreground">Revenue This Month</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-background/50 rounded-lg">
                      <div className="text-2xl font-bold text-secondary-accent">156</div>
                      <div className="text-xs text-muted-foreground">Active Customers</div>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-lg">
                      <div className="text-2xl font-bold text-gradient-gold">4.2K</div>
                      <div className="text-xs text-muted-foreground">AI Tokens Used</div>
                    </div>
                  </div>
                  
                  <Button asChild className="w-full bg-gradient-primary hover:shadow-glow">
                    <Link to="/dashboard">
                      View Full Dashboard
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of Indian MSMEs already using AI to boost their commerce operations
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-elegant hover-lift text-lg px-8 py-6"
            >
              <Link to="/dashboard">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <Globe className="w-4 h-4" />
              <span className="text-sm">Available in Hindi, Telugu & English</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;