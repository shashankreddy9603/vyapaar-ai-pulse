import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Shield, Store, UserPlus, LogOut, Trash2, Eye } from "lucide-react";

interface ShopOwner {
  id: string;
  full_name: string;
  shop_name: string;
  shop_address: string;
  email: string;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [shopOwners, setShopOwners] = useState<ShopOwner[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // New shop owner form
  const [newOwnerEmail, setNewOwnerEmail] = useState("");
  const [newOwnerPassword, setNewOwnerPassword] = useState("");
  const [newOwnerName, setNewOwnerName] = useState("");
  const [newOwnerShop, setNewOwnerShop] = useState("");

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (roleData?.role !== 'admin') {
        toast.error("Access denied. Admin rights required.");
        navigate("/dashboard");
        return;
      }

      setIsAdmin(true);
      loadShopOwners();
    } catch (error) {
      console.error("Error checking admin access:", error);
      navigate("/auth");
    } finally {
      setLoading(false);
    }
  };

  const loadShopOwners = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          full_name,
          shop_name,
          shop_address,
          created_at
        `);

      if (error) throw error;

      // Get emails from auth.users - this requires service role or admin access
      const ownersWithEmails = await Promise.all(
        (data || []).map(async (owner) => {
          // Check if user has shop_owner role
          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', owner.id)
            .eq('role', 'shop_owner')
            .single();

          if (!roleData) return null;

          return {
            ...owner,
            email: "Email hidden", // In production, you'd get this from a secure endpoint
          };
        })
      );

      setShopOwners(ownersWithEmails.filter(Boolean) as ShopOwner[]);
    } catch (error: any) {
      toast.error("Failed to load shop owners");
      console.error(error);
    }
  };

  const handleCreateShopOwner = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // In a real app, this would be done via an admin API endpoint
      // For now, we'll use the client with admin privileges
      const { data, error } = await supabase.auth.signUp({
        email: newOwnerEmail,
        password: newOwnerPassword,
        options: {
          data: {
            full_name: newOwnerName,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        // Update profile
        await supabase
          .from('profiles')
          .update({
            full_name: newOwnerName,
            shop_name: newOwnerShop,
          })
          .eq('id', data.user.id);

        // Assign shop_owner role
        await supabase
          .from('user_roles')
          .insert({
            user_id: data.user.id,
            role: 'shop_owner',
          });

        // Create default shop settings
        await supabase
          .from('shop_settings')
          .insert({
            shop_owner_id: data.user.id,
          });

        toast.success("Shop owner created successfully!");
        setIsDialogOpen(false);
        loadShopOwners();
        
        // Reset form
        setNewOwnerEmail("");
        setNewOwnerPassword("");
        setNewOwnerName("");
        setNewOwnerShop("");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to create shop owner");
    }
  };

  const handleDeleteShopOwner = async (ownerId: string) => {
    if (!confirm("Are you sure you want to delete this shop owner? This will delete all their data.")) {
      return;
    }

    try {
      // In production, this should be done via an admin API endpoint
      const { error } = await supabase.auth.admin.deleteUser(ownerId);

      if (error) throw error;

      toast.success("Shop owner deleted successfully!");
      loadShopOwners();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete shop owner");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-muted-foreground">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-success/5">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage shop owners and monitor system</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5 text-primary" />
                Total Shops
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{shopOwners.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-success" />
                Active Owners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{shopOwners.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-accent" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="bg-success">Operational</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Shop Owners Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Shop Owners</CardTitle>
                <CardDescription>Manage all registered shop owners</CardDescription>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Shop Owner
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Shop Owner</DialogTitle>
                    <DialogDescription>
                      Add a new shop owner account to the system
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateShopOwner} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={newOwnerName}
                        onChange={(e) => setNewOwnerName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shop">Shop Name</Label>
                      <Input
                        id="shop"
                        value={newOwnerShop}
                        onChange={(e) => setNewOwnerShop(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newOwnerEmail}
                        onChange={(e) => setNewOwnerEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={newOwnerPassword}
                        onChange={(e) => setNewOwnerPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Create Shop Owner
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Shop Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shopOwners.map((owner) => (
                  <TableRow key={owner.id}>
                    <TableCell className="font-medium">{owner.full_name}</TableCell>
                    <TableCell>{owner.shop_name || "Not set"}</TableCell>
                    <TableCell>{owner.email}</TableCell>
                    <TableCell>
                      {new Date(owner.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteShopOwner(owner.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
