import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import api from '@/lib/api';
import { Image, Plus, Edit, Trash2, ArrowLeft, LogOut } from 'lucide-react';

interface HomeBanner {
  _id: string;
  title: string;
  image: { url: string; publicId: string };
  order: number;
  isActive: boolean;
  createdAt: string;
}

const ManageHomeBanners = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [banners, setBanners] = useState<HomeBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<HomeBanner | null>(null);
  const [deleteBanner, setDeleteBanner] = useState<HomeBanner | null>(null);
  const [formData, setFormData] = useState<{ title: string; order: number; isActive: boolean; image: File | null }>({
    title: '',
    order: 0,
    isActive: true,
    image: null,
  });

  const fetchBanners = async () => {
    try {
      const res = await api.get('/home-banners?all=true');
      setBanners(res.data);
    } catch (error: any) {
      toast({ title: 'Failed to load banners', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBanners(); }, []);

  const resetForm = () => {
    setFormData({ title: '', order: 0, isActive: true, image: null });
    setEditingBanner(null);
  };

  const handleCreateOrUpdate = async () => {
    try {
      const fd = new FormData();
      fd.append('title', formData.title);
      fd.append('order', String(formData.order));
      fd.append('isActive', String(formData.isActive));
      if (formData.image) fd.append('image', formData.image);

      if (editingBanner) {
        await api.put(`/home-banners/${editingBanner._id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast({ title: 'Banner updated' });
      } else {
        await api.post('/home-banners', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast({ title: 'Banner created' });
      }
      setIsDialogOpen(false);
      resetForm();
      fetchBanners();
    } catch (error: any) {
      toast({ title: 'Action failed', description: error.message, variant: 'destructive' });
    }
  };

  const handleDelete = async () => {
    if (!deleteBanner) return;
    try {
      await api.delete(`/home-banners/${deleteBanner._id}`);
      toast({ title: 'Banner deleted' });
      setDeleteBanner(null);
      fetchBanners();
    } catch (error: any) {
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
    toast({ title: 'Logged out successfully', description: 'You have been logged out.' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-16 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => navigate('/admin/dashboard')}>
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Dashboard
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">Home Images</h1>
                  <p className="text-muted-foreground">Manage homepage banner images</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
                  <LogOut size={16} />
                  Logout
                </Button>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus size={16} />
                      Add Banner
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingBanner ? 'Edit Banner' : 'Add Banner'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                      </div>
                      <div>
                        <Label htmlFor="order">Order</Label>
                        <Input id="order" type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Active</Label>
                        <Switch checked={formData.isActive} onCheckedChange={(v) => setFormData({ ...formData, isActive: v })} />
                      </div>
                      <div>
                        <Label htmlFor="image">Image</Label>
                        <Input id="image" type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })} />
                      </div>
                      <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={() => { setIsDialogOpen(false); resetForm(); }}>Cancel</Button>
                        <Button onClick={handleCreateOrUpdate}>{editingBanner ? 'Save Changes' : 'Create'}</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {loading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {banners.map((banner) => (
                  <Card key={banner._id} className="bg-card/50 backdrop-blur-sm border-border">
                    <CardHeader>
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Image className="text-primary" size={28} />
                      </div>
                      <CardTitle>{banner.title || 'Untitled'}</CardTitle>
                      <CardDescription>Order: {banner.order}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="relative w-full h-48 rounded-md overflow-hidden border">
                        <img src={banner.image.url} alt={banner.title} className="w-full h-full object-cover object-center" />
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={banner.isActive}
                            onCheckedChange={async (v) => {
                              try {
                                const fd = new FormData();
                                fd.append('isActive', String(v));
                                await api.put(`/home-banners/${banner._id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
                                fetchBanners();
                              } catch (error: any) {
                                toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
                              }
                            }}
                          />
                          <span className="text-sm text-muted-foreground">Active</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            className="flex items-center gap-2"
                            onClick={() => {
                              setEditingBanner(banner);
                              setFormData({ title: banner.title || '', order: banner.order, isActive: banner.isActive, image: null });
                              setIsDialogOpen(true);
                            }}
                          >
                            <Edit size={16} /> Edit
                          </Button>
                          <Button
                            variant="destructive"
                            className="flex items-center gap-2"
                            onClick={() => setDeleteBanner(banner)}
                          >
                            <Trash2 size={16} /> Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />

      <AlertDialog open={!!deleteBanner} onOpenChange={(open) => !open && setDeleteBanner(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Banner?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteBanner(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageHomeBanners;