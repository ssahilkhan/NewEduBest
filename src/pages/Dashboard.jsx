
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BookOpen, 
  Calculator, 
  Shirt, 
  Laptop, 
  ShoppingCart, 
  PlusCircle, 
  Heart, 
  List,
  LogOut,
  User
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(currentUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const categories = [
    {
      title: "Textbooks",
      description: "Academic books, reference materials, study guides",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      items: "150+ items"
    },
    {
      title: "Calculators & Tools",
      description: "Scientific calculators, drafting tools, instruments",
      icon: Calculator,
      color: "from-green-500 to-green-600",
      items: "80+ items"
    },
    {
      title: "Lab Equipment",
      description: "Lab coats, safety gear, experimental tools",
      icon: Shirt,
      color: "from-purple-500 to-purple-600",
      items: "60+ items"
    },
    {
      title: "Electronics & Software",
      description: "Laptops, software licenses, tech accessories",
      icon: Laptop,
      color: "from-orange-500 to-orange-600",
      items: "90+ items"
    }
  ];

  const quickActions = [
    {
      title: "Browse & Buy",
      description: "Explore items from fellow students",
      icon: ShoppingCart,
      action: () => navigate('/buy'),
      color: "from-emerald-500 to-emerald-600"
    },
    {
      title: "Sell Items",
      description: "List your academic items for sale",
      icon: PlusCircle,
      action: () => navigate('/sell'),
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "My Wishlist",
      description: "View saved items and favorites",
      icon: Heart,
      action: () => navigate('/wishlist'),
      color: "from-pink-500 to-pink-600"
    },
    {
      title: "My Listings",
      description: "Manage your posted items",
      icon: List,
      action: () => navigate('/my-listings'),
      color: "from-purple-500 to-purple-600"
    }
  ];

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold gradient-text">EduCycle</h1>
              <div className="hidden md:block h-6 w-px bg-gray-300"></div>
              <div className="hidden md:flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">Welcome, {user.name}!</span>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">
            Welcome to Your Dashboard
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover, buy, sell, and donate academic essentials within your student community. 
            Zero platform fees, maximum impact!
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">Quick Actions</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card 
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200"
                  onClick={action.action}
                >
                  <CardHeader className="text-center">
                    <div className={`mx-auto w-16 h-16 bg-gradient-to-r ${action.color} rounded-full flex items-center justify-center mb-4`}>
                      <action.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 text-sm">{action.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">Browse Categories</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card 
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200"
                  onClick={() => navigate('/buy')}
                >
                  <CardHeader className="text-center">
                    <div className={`mx-auto w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mb-4`}>
                      <category.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 text-sm mb-2">{category.description}</p>
                    <p className="text-purple-600 font-semibold text-sm">{category.items}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <h4 className="text-3xl font-bold mb-2">380+</h4>
                  <p className="text-purple-100">Active Listings</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold mb-2">1,200+</h4>
                  <p className="text-purple-100">Happy Students</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold mb-2">₹0</h4>
                  <p className="text-purple-100">Platform Fees</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
