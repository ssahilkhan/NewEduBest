
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Heart, 
  MessageCircle, 
  BookOpen,
  Calculator,
  Shirt,
  Laptop
} from 'lucide-react';

const BuyPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [listings, setListings] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Load listings from localStorage
    const savedListings = localStorage.getItem('listings');
    if (savedListings) {
      setListings(JSON.parse(savedListings));
    } else {
      // Sample data for demonstration
      const sampleListings = [
        {
          id: 1,
          title: "Engineering Mathematics Textbook",
          description: "Complete set of engineering mathematics books for first year",
          price: 800,
          condition: "good",
          category: "textbooks",
          images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400"],
          seller: "Rahul Kumar",
          contact: "rahul@example.com",
          isDonation: false
        },
        {
          id: 2,
          title: "Scientific Calculator Casio FX-991ES",
          description: "Barely used scientific calculator, perfect for engineering students",
          price: 1200,
          condition: "excellent",
          category: "calculators",
          images: ["https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400"],
          seller: "Priya Sharma",
          contact: "priya@example.com",
          isDonation: false
        },
        {
          id: 3,
          title: "Lab Coat - Medium Size",
          description: "White lab coat in excellent condition, suitable for chemistry/biology labs",
          price: 0,
          condition: "good",
          category: "lab-equipment",
          images: ["https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400"],
          seller: "Amit Patel",
          contact: "amit@example.com",
          isDonation: true
        },
        {
          id: 4,
          title: "Programming Books Bundle",
          description: "Collection of programming books including Python, Java, and C++",
          price: 1500,
          condition: "good",
          category: "textbooks",
          images: ["https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400"],
          seller: "Sneha Reddy",
          contact: "sneha@example.com",
          isDonation: false
        }
      ];
      setListings(sampleListings);
      localStorage.setItem('listings', JSON.stringify(sampleListings));
    }

    // Load wishlist
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || listing.category === selectedCategory;
    const matchesCondition = selectedCondition === 'all' || listing.condition === selectedCondition;
    
    return matchesSearch && matchesCategory && matchesCondition;
  });

  const toggleWishlist = (listingId) => {
    const newWishlist = wishlist.includes(listingId)
      ? wishlist.filter(id => id !== listingId)
      : [...wishlist, listingId];
    
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    
    toast({
      title: wishlist.includes(listingId) ? "Removed from wishlist" : "Added to wishlist",
      description: wishlist.includes(listingId) ? "Item removed from your wishlist" : "Item added to your wishlist"
    });
  };

  const contactSeller = (listing) => {
    toast({
      title: "Contact Information",
      description: `Contact ${listing.seller} at ${listing.contact}`
    });
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'textbooks': return BookOpen;
      case 'calculators': return Calculator;
      case 'lab-equipment': return Shirt;
      case 'electronics': return Laptop;
      default: return BookOpen;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-2xl font-bold gradient-text">Browse & Buy</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="textbooks">Textbooks</SelectItem>
                    <SelectItem value="calculators">Calculators & Tools</SelectItem>
                    <SelectItem value="lab-equipment">Lab Equipment</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                  <SelectTrigger>
                    <SelectValue placeholder="Condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Conditions</SelectItem>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                  <Filter className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              {filteredListings.length} items found
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => {
              const CategoryIcon = getCategoryIcon(listing.category);
              return (
                <motion.div
                  key={listing.id}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                      <img  
                        className="w-full h-48 object-cover"
                        alt={listing.title}
                       src="https://images.unsplash.com/photo-1677287148718-e9bd18f61de2" />
                      <div className="absolute top-2 right-2 flex space-x-2">
                        {listing.isDonation && (
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            FREE
                          </span>
                        )}
                        <Button
                          size="sm"
                          variant={wishlist.includes(listing.id) ? "default" : "secondary"}
                          className="p-2"
                          onClick={() => toggleWishlist(listing.id)}
                        >
                          <Heart 
                            className={`h-4 w-4 ${wishlist.includes(listing.id) ? 'fill-current' : ''}`} 
                          />
                        </Button>
                      </div>
                      <div className="absolute top-2 left-2">
                        <div className="bg-white/90 p-2 rounded-full">
                          <CategoryIcon className="h-4 w-4 text-purple-600" />
                        </div>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{listing.title}</CardTitle>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-purple-600">
                          {listing.isDonation ? 'FREE' : `₹${listing.price}`}
                        </span>
                        <span className="text-sm text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded">
                          {listing.condition}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">{listing.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          by {listing.seller}
                        </span>
                        <Button 
                          size="sm"
                          onClick={() => contactSeller(listing)}
                          className="bg-gradient-to-r from-green-500 to-green-600"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {filteredListings.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No items found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or browse all categories</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BuyPage;
