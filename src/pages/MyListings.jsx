
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, Edit, Trash2, Eye, Plus } from 'lucide-react';

const MyListings = () => {
  const navigate = useNavigate();
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Load user's listings
    const savedListings = localStorage.getItem('userListings');
    if (savedListings) {
      setUserListings(JSON.parse(savedListings));
    }
  }, [navigate]);

  const deleteListing = (listingId) => {
    // Remove from user listings
    const updatedUserListings = userListings.filter(listing => listing.id !== listingId);
    setUserListings(updatedUserListings);
    localStorage.setItem('userListings', JSON.stringify(updatedUserListings));

    // Remove from global listings
    const allListings = JSON.parse(localStorage.getItem('listings') || '[]');
    const updatedAllListings = allListings.filter(listing => listing.id !== listingId);
    localStorage.setItem('listings', JSON.stringify(updatedAllListings));

    toast({
      title: "Listing deleted",
      description: "Your listing has been removed successfully"
    });
  };

  const markAsSold = (listingId) => {
    const updatedUserListings = userListings.map(listing =>
      listing.id === listingId ? { ...listing, status: 'sold' } : listing
    );
    setUserListings(updatedUserListings);
    localStorage.setItem('userListings', JSON.stringify(updatedUserListings));

    // Update global listings
    const allListings = JSON.parse(localStorage.getItem('listings') || '[]');
    const updatedAllListings = allListings.map(listing =>
      listing.id === listingId ? { ...listing, status: 'sold' } : listing
    );
    localStorage.setItem('listings', JSON.stringify(updatedAllListings));

    toast({
      title: "Marked as sold",
      description: "Your item has been marked as sold"
    });
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
              <h1 className="text-2xl font-bold gradient-text">My Listings</h1>
            </div>
            <Button onClick={() => navigate('/sell')} className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Plus className="h-4 w-4 mr-2" />
              Add New Listing
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {userListings.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Plus className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No listings yet</h3>
              <p className="text-gray-500 mb-6">Start selling your academic items to help fellow students</p>
              <Button 
                onClick={() => navigate('/sell')}
                className="bg-gradient-to-r from-purple-600 to-blue-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Listing
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">
                  {userListings.length} listing{userListings.length !== 1 ? 's' : ''}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userListings.map((listing) => (
                  <motion.div
                    key={listing.id}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="relative">
                        {listing.images && listing.images.length > 0 ? (
                          <img
                            src={listing.images[0]}
                            alt={listing.title}
                            className="w-full h-48 object-cover"
                          />
                        ) : (
                          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                            <Eye className="h-12 w-12 text-gray-400" />
                          </div>
                        )}
                        <div className="absolute top-2 right-2 flex space-x-2">
                          {listing.isDonation && (
                            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                              FREE
                            </span>
                          )}
                          {listing.status === 'sold' && (
                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                              SOLD
                            </span>
                          )}
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
                        <div className="flex items-center justify-between space-x-2">
                          {listing.status !== 'sold' && (
                            <Button
                              size="sm"
                              onClick={() => markAsSold(listing.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Mark as Sold
                            </Button>
                          )}
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                // Edit functionality can be implemented later
                                toast({
                                  title: "Coming Soon",
                                  description: "Edit functionality will be available soon"
                                });
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteListing(listing.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
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

export default MyListings;
