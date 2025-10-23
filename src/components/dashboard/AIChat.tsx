import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Mic, 
  Image as ImageIcon,
  Clock,
  CheckCircle
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  tokens?: number;
}

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Namaste! 🙏 I\'m your VyaapaarAI assistant. I can help with inventory, stock updates, and promotional messages for your kirana store. How can I help?',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
    },
    {
      id: '2',
      type: 'user',
      content: 'Can you create a WhatsApp message for our new stock arrival?',
      timestamp: new Date(Date.now() - 4 * 60 * 1000),
    },
    {
      id: '3',
      type: 'ai',
      content: '✨ *नमस्ते!* ✨\n\nFresh stock just arrived! 🛒\n\n💫 *New Arrivals*\n✅ Premium rice & wheat\n✅ Fresh fruits & vegetables\n✅ Daily essentials\n\n📱 Check availability on WhatsApp!\n*Visit us today!*',
      timestamp: new Date(Date.now() - 3 * 60 * 1000),
      tokens: 87
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Math.random().toString(36).substring(7),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "I've analyzed your request and generated a professional WhatsApp message for your product. The message includes emojis, pricing, and a clear call-to-action to maximize engagement.",
        "Based on your inventory data, I recommend creating a promotional campaign for the low-stock items. This will help clear inventory while maintaining profit margins.",
        "I can help you generate a beautiful marketing poster for your products. Would you like me to create one with your branding and product details?",
        "Your customer engagement has increased by 23% this week! I notice most queries are about saree collections. Consider expanding this category.",
        "I've processed your voice message and updated the inventory. Added 5 silk sarees in red color at ₹2,500 each. Stock levels updated in Google Sheets."
      ];

      const aiMessage: Message = {
        id: Math.random().toString(36).substring(7),
        type: 'ai',
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date(),
        tokens: Math.floor(Math.random() * 100) + 50
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const suggestedPrompts = [
    "Stock availability message",
    "Check inventory status",
    "Create promotion message",
    "Get reorder suggestions"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            AI Business Assistant
          </h2>
          <p className="text-muted-foreground">Get help with inventory, marketing, and customer queries</p>
        </div>
        
        <Badge className="bg-success/10 text-success border-success/20">
          <CheckCircle className="w-3 h-3 mr-1" />
          Online
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="bg-gradient-card border-0 shadow-elegant h-[600px] flex flex-col">
            <CardHeader className="border-b bg-background/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">VyaapaarAI Assistant</CardTitle>
                    <CardDescription>Powered by GPT-4o-mini</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  24/7 Available
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-hidden p-0">
              <div className="h-full flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === 'user' 
                            ? 'bg-gradient-secondary' 
                            : 'bg-gradient-primary'
                        }`}>
                          {message.type === 'user' ? (
                            <User className="w-4 h-4 text-secondary-accent" />
                          ) : (
                            <Bot className="w-4 h-4 text-primary-foreground" />
                          )}
                        </div>
                        
                        <div className={`rounded-lg p-3 ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-background border'
                        }`}>
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-current/10">
                            <span className="text-xs opacity-70">
                              {formatTime(message.timestamp)}
                            </span>
                            {message.tokens && (
                              <Badge variant="outline" className="text-xs">
                                {message.tokens} tokens
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <div className="bg-background border rounded-lg p-3">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
                
                <div className="border-t p-4 bg-background/50">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Mic className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                    <Input
                      placeholder="Type your message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSend}
                      className="bg-gradient-primary"
                      disabled={!input.trim() || isTyping}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Suggestions Panel */}
        <div className="space-y-6">
          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>Try these common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {suggestedPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => setInput(prompt)}
                >
                  <MessageSquare className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-xs">{prompt}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-lg">AI Capabilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Inventory Management</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Marketing Content</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Customer Support</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Business Analytics</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};