import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  LogOut
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import api from '@/lib/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

interface HomeImage {
  _id: string;
  title?: string;
  description?: string;
  image: {
    url: string;
    publicId: string;
  };
  isActive: boolean;
  order: number;
  createdBy: {
    name: string;
    email: string;
  };
  createdAt: string;
}

const ManageHomeImages = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [homeImages, setHomeImages] = useState<HomeImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<HomeImage | null>(null);
  const [deleteImage, setDeleteImage] = useState<HomeImage | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    order: '',
    image: null as File | null
  });

  useEffect(() => {
    fetchHomeImages();
  }, []);

  const fetchHomeImages = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/home-images`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch home images');
      }

      const result = await response.json();
      setHomeImages(result.data || []);
    } catch (error) {
      console.error('Error fetching home images:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch home images",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      order: '',
      image: null
    });
    setEditingImage(null);
    setImagePreview(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (image: HomeImage) => {
    setEditingImage(image);
    setFormData({
      title: image.title || '',
      description: image.description || '',
      order: image.order.toString(),
      image: null
    });
    setImagePreview(image.image.url);
    setIsDialogOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      if (formData.order) {
        formDataToSend.append('order', formData.order);
      }
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const url = editingImage 
        ? `${API_URL}/home-images/${editingImage._id}`
        : `${API_URL}/home-images`;
      
      const method = editingImage ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save home image');
      }

      toast({
        title: "Success",
        description: editingImage ? "Home image updated successfully" : "Home image created successfully",
      });

      resetForm();
      await fetchHomeImages();
      
      // Invalidate React Query cache to refresh home page
      queryClient.invalidateQueries({ queryKey: ['home-images'] });
    } catch (error) {
      console.error('Error saving home image:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save home image",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteImage) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/home-images/${deleteImage._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete home image');
      }

      toast({
        title: "Success",
        description: "Home image deleted successfully",
      });

      setDeleteImage(null);
      fetchHomeImages();
    } catch (error) {
      console.error('Error deleting home image:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete home image",
        variant: "destructive"
      });
    }
  };

  const toggleActive = async (image: HomeImage) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/home-images/${image._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          isActive: !image.isActive,
          title: image.title,
          description: image.description,
          order: image.order
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update home image');
      }

      toast({
        title: "Success",
        description: `Home image ${!image.isActive ? 'activated' : 'deactivated'} successfully`,
      });

      fetchHomeImages();
    } catch (error) {
      console.error('Error toggling home image:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update home image",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out.",
    });
  };

  const sortedImages = [...homeImages].sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Manage Home Images</h1>
                <p className="text-muted-foreground">Add, edit, or remove images for the home page carousel</p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => navigate('/admin/dashboard')}
                  variant="outline"
                >
                  Back to Dashboard
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm} className="flex items-center gap-2">
                    <Plus size={16} />
                    Add New Image
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingImage ? 'Edit Home Image' : 'Add New Home Image'}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title (Optional)</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="Enter image title"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="Enter image description"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="order">Order (Optional - lower numbers appear first)</Label>
                      <Input
                        id="order"
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData({...formData, order: e.target.value})}
                        placeholder="Enter order number"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image">Image {editingImage ? '(optional - leave empty to keep current)' : '*'}</Label>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        {...(!editingImage && { required: true })}
                      />
                      {imagePreview && (
                        <div className="mt-4">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-full h-64 object-cover rounded-lg border border-border"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <Button type="submit" className="flex-1">
                        {editingImage ? 'Update' : 'Create'}
                      </Button>
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : sortedImages.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">No home images added yet. Click "Add New Image" to get started.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedImages.map((image) => (
                  <Card key={image._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative">
                      <img 
                        src={image.image.url} 
                        alt={image.title || 'Home image'}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className={image.isActive ? 'bg-green-500' : 'bg-gray-500'}>
                          {image.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-1">{image.title || 'Untitled'}</CardTitle>
                      {image.description && (
                        <CardDescription className="line-clamp-2">
                          {image.description}
                        </CardDescription>
                      )}
                      <CardDescription className="text-xs">
                        Order: {image.order}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(image)}
                          className="flex-1"
                        >
                          <Edit size={14} className="mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleActive(image)}
                          className="flex-1"
                        >
                          {image.isActive ? (
                            <>
                              <EyeOff size={14} className="mr-1" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <Eye size={14} className="mr-1" />
                              Activate
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => setDeleteImage(image)}
                          className="flex-1"
                        >
                          <Trash2 size={14} className="mr-1" />
                          Delete
                        </Button>
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteImage} onOpenChange={() => setDeleteImage(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Home Image</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this home image? This action cannot be undone and will also delete the associated image.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageHomeImages;

