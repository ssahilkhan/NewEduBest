
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, Upload, Plus, X } from 'lucide-react';

const SellPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    isDonation: false,
    images: []
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (formData.images.length + files.length > 4) {
      toast({
        title: "Too many images",
        description: "You can upload maximum 4 images",
        variant: "destructive"
      });
      return;
    }

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, e.target.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category || !formData.condition) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (!formData.isDonation && !formData.price) {
      toast({
        title: "Error",
        description: "Please enter a price or mark as donation",
        variant: "destructive"
      });
      return;
    }

    // Get current user
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Create new listing
    const newListing = {
      id: Date.now(),
      ...formData,
      price: formData.isDonation ? 0 : parseInt(formData.price),
      seller: currentUser.name,
      contact: currentUser.email,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const existingListings = JSON.parse(localStorage.getItem('listings') || '[]');
    const updatedListings = [...existingListings, newListing];
    localStorage.setItem('listings', JSON.stringify(updatedListings));

    // Save to user's listings
    const userListings = JSON.parse(localStorage.getItem('userListings') || '[]');
    userListings.push(newListing);
    localStorage.setItem('userListings', JSON.stringify(userListings));

    toast({
      title: "Success!",
      description: "Your item has been listed successfully"
    });

    setTimeout(() => {
      navigate('/my-listings');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold gradient-text">Sell Your Items</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">List Your Academic Item</CardTitle>
              <p className="text-gray-600">
                Help fellow students by selling or donating your academic essentials
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Item Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Engineering Mathematics Textbook"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the item condition, usage, and any other relevant details..."
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>

                {/* Category and Condition */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleSelectChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="textbooks">Textbooks</SelectItem>
                        <SelectItem value="calculators">Calculators & Tools</SelectItem>
                        <SelectItem value="lab-equipment">Lab Equipment</SelectItem>
                        <SelectItem value="electronics">Electronics & Software</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Condition *</Label>
                    <Select value={formData.condition} onValueChange={(value) => handleSelectChange('condition', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent - Like new</SelectItem>
                        <SelectItem value="good">Good - Minor wear</SelectItem>
                        <SelectItem value="fair">Fair - Noticeable wear</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Price or Donation */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isDonation"
                      name="isDonation"
                      checked={formData.isDonation}
                      onChange={handleInputChange}
                      className="rounded"
                    />
                    <Label htmlFor="isDonation">I want to donate this item for free</Label>
                  </div>

                  {!formData.isDonation && (
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (₹) *</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        placeholder="Enter price in rupees"
                        value={formData.price}
                        onChange={handleInputChange}
                        required={!formData.isDonation}
                      />
                    </div>
                  )}
                </div>

                {/* Image Upload */}
                <div className="space-y-4">
                  <Label>Images (Max 4)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Click to upload images</p>
                      <p className="text-sm text-gray-500">PNG, JPG up to 10MB each</p>
                    </label>
                  </div>

                  {/* Image Preview */}
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 py-3"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {formData.isDonation ? 'List for Donation' : 'List for Sale'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SellPage;
