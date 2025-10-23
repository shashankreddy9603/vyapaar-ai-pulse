import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageCircle, 
  Send, 
  Phone, 
  CheckCheck, 
  Clock, 
  Smartphone,
  Mic,
  Camera,
  Image as ImageIcon,
  Users,
  TrendingUp
} from 'lucide-react';

interface WhatsAppMessage {
  id: string;
  type: 'sent' | 'received';
  content: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  isAI?: boolean;
}

export const WhatsAppSimulator = () => {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([
    {
      id: '1',
      type: 'received',
      content: 'Namaste! Basmati rice available hai kya? 5kg bag chahiye.',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      status: 'read'
    },
    {
      id: '2',
      type: 'sent',
      content: '🙏 Namaste! Haan ji, Basmati rice available hai!\n\n📦 Stock Details:\n• 5kg bag - ₹350\n• Fresh stock aaya hai\n• Premium quality\n\n✨ Special Offer:\nAaj 10% off on 10kg pack - ₹630 only!\n\nKya aapko chahiye?',
      timestamp: new Date(Date.now() - 9 * 60 * 1000),
      status: 'read',
      isAI: true
    },
    {
      id: '3',
      type: 'received',
      content: 'Aur dal bhi hai? Toor dal?',
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      status: 'read'
    },
    {
      id: '4',
      type: 'sent',
      content: '✅ Toor dal available hai!\n\nStock available:\n🟡 Toor Dal 1kg - ₹120\n🟢 Moong Dal 1kg - ₹110\n🔴 Masoor Dal 1kg - ₹95\n\n🎉 Combo Offer:\nRice 5kg + Toor Dal 1kg = ₹450\n(₹20 bachao!)\n\nInterested ho toh batao! 😊',
      timestamp: new Date(Date.now() - 7 * 60 * 1000),
      status: 'read',
      isAI: true
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: WhatsAppMessage = {
      id: Math.random().toString(36).substring(7),
      type: 'sent',
      content: newMessage,
      timestamp: new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === userMessage.id ? { ...msg, status: 'sent' } : msg
      ));
    }, 1000);

    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === userMessage.id ? { ...msg, status: 'delivered' } : msg
      ));
    }, 2000);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        '✅ Stock available hai! Abhi store pe aajao.\n\n📍 Store timing:\n• Morning: 7 AM - 1 PM\n• Evening: 4 PM - 9 PM\n\n🎉 Aaj ka special offer:\nRice + Dal combo pe 10% discount!\n\nAur kuch chahiye? 🙏',
        '🎊 Festival Special Offers!\n\n• Cooking Oil - 15% OFF\n• Atta 10kg - ₹50 discount\n• Sugar 5kg - Buy 2 Get 1 FREE\n\nValid till Sunday!\n\nStore address: Shop No. 12, Main Road',
        '✨ Good news! Fresh stock aaya hai:\n\n✅ Premium Basmati Rice\n✅ Organic Pulses\n✅ Pure Desi Ghee\n\nStore pe visit karo ya call karo:\n📞 +91-9876543210',
      ];

      const aiMessage: WhatsAppMessage = {
        id: Math.random().toString(36).substring(7),
        type: 'received',
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date(),
        status: 'read',
        isAI: true
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 3000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sending':
        return <Clock className="w-3 h-3 text-muted-foreground" />;
      case 'sent':
        return <CheckCheck className="w-3 h-3 text-muted-foreground" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-muted-foreground" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-primary" />;
      default:
        return null;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-secondary rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-secondary-accent" />
            </div>
            WhatsApp Business Integration
          </h2>
          <p className="text-muted-foreground">Stock availability updates and promotional offers via WhatsApp</p>
        </div>
        
        <div className="flex gap-2">
          <Badge className="bg-success/10 text-success border-success/20">
            <Users className="w-3 h-3 mr-1" />
            156 Customers
          </Badge>
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <TrendingUp className="w-3 h-3 mr-1" />
            23% Response Rate
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* WhatsApp Chat Simulator */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader className="bg-[#075E54] text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">Rajesh Kumar</CardTitle>
                    <CardDescription className="text-white/80 text-sm">
                      Online • Regular customer
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0 bg-[#E5DDD5] h-[500px] flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] rounded-lg p-3 relative ${
                      message.type === 'sent'
                        ? 'bg-[#DCF8C6] text-black'
                        : 'bg-white text-black'
                    }`}>
                      {message.isAI && message.type === 'sent' && (
                        <Badge className="absolute -top-2 -left-2 bg-gradient-primary text-primary-foreground text-xs">
                          AI
                        </Badge>
                      )}
                      
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      
                      <div className={`flex items-center gap-1 mt-1 ${
                        message.type === 'sent' ? 'justify-end' : 'justify-start'
                      }`}>
                        <span className="text-xs text-gray-600">
                          {formatTime(message.timestamp)}
                        </span>
                        {message.type === 'sent' && getStatusIcon(message.status)}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white rounded-lg p-3 max-w-[70%]">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="border-t bg-white p-4">
                <div className="flex gap-2 items-end">
                  <Button variant="ghost" size="sm" className="p-2">
                    <Camera className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                  <Textarea
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 min-h-[40px] max-h-[120px] resize-none"
                    rows={1}
                  />
                  <Button variant="ghost" size="sm" className="p-2">
                    <Mic className="w-4 h-4" />
                  </Button>
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-[#075E54] hover:bg-[#064A42] text-white p-2"
                    disabled={!newMessage.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* AI Features Panel */}
        <div className="space-y-6">
          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-lg">AI Features Active</CardTitle>
              <CardDescription>Real-time assistance for customer interactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                  <CheckCheck className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-sm">Stock Updates</p>
                  <p className="text-xs text-muted-foreground">Real-time stock availability info</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Mic className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-sm">Voice Processing</p>
                  <p className="text-xs text-muted-foreground">Convert voice to text & respond</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-accent-gold/10 rounded-lg">
                <div className="w-8 h-8 bg-accent-gold rounded-full flex items-center justify-center">
                  <Camera className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-sm">Promotion Alerts</p>
                  <p className="text-xs text-muted-foreground">Notify customers about offers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-lg">Quick Templates</CardTitle>
              <CardDescription>AI-generated message templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-xs h-auto p-2"
                onClick={() => setNewMessage('🙏 Namaste! Thanks for your message. Stock available hai, store pe aajao!')}
              >
                Stock Available
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-xs h-auto p-2"
                onClick={() => setNewMessage('😔 Sorry, ye item abhi out of stock hai. Kal fresh stock aayega!')}
              >
                Out of Stock
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-xs h-auto p-2"
                onClick={() => setNewMessage('🎉 Festival special! 20% off on rice, dal, and oil. Valid till Sunday. Visit store now!')}
              >
                Promotion Alert
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};