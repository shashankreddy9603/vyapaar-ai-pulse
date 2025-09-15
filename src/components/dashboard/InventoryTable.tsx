import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Package, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Upload,
  Mic,
  Camera,
  IndianRupee
} from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  lastUpdated: string;
}

export const InventoryTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'Silk Saree - Red',
      category: 'Clothing',
      stock: 15,
      price: 2500,
      status: 'in-stock',
      lastUpdated: '2 hours ago'
    },
    {
      id: '2',
      name: 'Cotton Kurta Set',
      category: 'Clothing',
      stock: 8,
      price: 800,
      status: 'in-stock',
      lastUpdated: '1 hour ago'
    },
    {
      id: '3',
      name: 'Designer Lehenga',
      category: 'Clothing',
      stock: 3,
      price: 5000,
      status: 'low-stock',
      lastUpdated: '30 minutes ago'
    },
    {
      id: '4',
      name: 'Handloom Dupatta',
      category: 'Accessories',
      stock: 0,
      price: 400,
      status: 'out-of-stock',
      lastUpdated: '5 minutes ago'
    }
  ]);

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'bg-success/10 text-success border-success/20';
      case 'low-stock':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'out-of-stock':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Package className="w-6 h-6 text-primary" />
            Inventory Management
          </h2>
          <p className="text-muted-foreground">Manage your product inventory with AI assistance</p>
        </div>
        
        <div className="flex gap-2">
          <Button className="bg-gradient-secondary text-secondary-accent border-secondary-accent/20">
            <Mic className="w-4 h-4 mr-2" />
            Voice Add
          </Button>
          <Button className="bg-gradient-gold text-accent-foreground">
            <Camera className="w-4 h-4 mr-2" />
            Photo Add
          </Button>
        </div>
      </div>

      {/* AI Input Demo */}
      <Card className="bg-gradient-card border-0 shadow-elegant">
        <CardHeader>
          <CardTitle className="text-lg">AI-Powered Inventory Update</CardTitle>
          <CardDescription>
            Use voice messages or photos to automatically update your inventory
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-background/50 rounded-lg border-2 border-dashed border-secondary-accent/30">
              <div className="text-center">
                <Mic className="w-8 h-8 mx-auto mb-2 text-secondary-accent" />
                <p className="text-sm text-muted-foreground mb-2">Record Voice Message</p>
                <p className="text-xs text-muted-foreground italic">
                  "Bhaiya, 5 silk sarees aaye hain, red color mein, 2500 rupees each"
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  <Mic className="w-4 h-4 mr-2" />
                  Start Recording
                </Button>
              </div>
            </div>
            
            <div className="p-4 bg-background/50 rounded-lg border-2 border-dashed border-accent-gold/30">
              <div className="text-center">
                <Camera className="w-8 h-8 mx-auto mb-2 text-accent-gold" />
                <p className="text-sm text-muted-foreground mb-2">Upload Product Photo</p>
                <p className="text-xs text-muted-foreground italic">
                  AI will identify product and suggest pricing
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Photo
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card className="bg-gradient-card border-0 shadow-elegant">
        <CardContent className="pt-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card className="bg-gradient-card border-0 shadow-elegant">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id} className="hover:bg-background/50">
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.stock}</span>
                      <span className="text-xs text-muted-foreground">units</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <IndianRupee className="w-3 h-3" />
                      <span>{formatCurrency(item.price)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.lastUpdated}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};