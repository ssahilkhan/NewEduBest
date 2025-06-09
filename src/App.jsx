
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import WelcomePage from '@/pages/WelcomePage';
import LoginPage from '@/pages/LoginPage';
import Dashboard from '@/pages/Dashboard';
import BuyPage from '@/pages/BuyPage';
import SellPage from '@/pages/SellPage';
import MyListings from '@/pages/MyListings';
import Wishlist from '@/pages/Wishlist';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/buy" element={<BuyPage />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/my-listings" element={<MyListings />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
