
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, Heart, MessageCircle, Trash2 } from 'lucide-react';

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [allListings, setAllListings] = useState([]);

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Load wishlist and all listings
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const savedListings = JSON.parse(localStorage.getItem('listings') || '[]');
    
    setAllListings(savedListings);
    
    // Filter listings that are in wishlist
    const wishlistListings = savedListings.filter(listing => 
      savedWishlist.includes(listing.id)
    );
    setWishlistItems(wishlistListings);
  }, [navigate]);

  const removeFromWishlist = (listingId) => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const updatedWishlist = savedWishlist.filter(id => id !== listingId);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    
    const updatedWishlistItems = wishlistItems.filter(item => item.id !== listingId);
    setWishlistItems(updatedWishlistItems);
    
    toast({
      title: "Removed from wishlist",
      description: "Item removed from your wishlist"
    });
  };

  const contactSeller = (listing) => {
    toast({
      title: "Contact Information",
      description: `Contact ${listing.seller} at ${listing.contact}`
    });
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
            <h1 className="text-2xl font-bold gradient-text">My Wishlist</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Heart className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-500 mb-6">Browse items and add them to your wishlist to keep track of what you want</p>
              <Button 
                onClick={() => navigate('/buy')}
                className="bg-gradient-to-r from-purple-600 to-blue-600"
              >
                Browse Items
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">
                  {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} in your wishlist
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((listing) => (
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
                            variant="destructive"
                            className="p-2"
                            onClick={() => removeFromWishlist(listing.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{listing.description}</p>
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
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Wishlist;
