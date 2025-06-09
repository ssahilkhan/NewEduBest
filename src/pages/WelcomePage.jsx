
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BookOpen, 
  Calculator, 
  Shirt, 
  Users, 
  ArrowRight, 
  Heart, 
  Shield, 
  Zap,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Github
} from 'lucide-react';

const WelcomePage = () => {
  const navigate = useNavigate();

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const steps = [
    {
      number: "01",
      title: "Sign Up or Log In",
      description: "Create your account with just your email",
      icon: Users
    },
    {
      number: "02", 
      title: "Access Dashboard",
      description: "Choose your category and explore options",
      icon: BookOpen
    },
    {
      number: "03",
      title: "Buy Items",
      description: "Browse listings from fellow students",
      icon: Calculator
    },
    {
      number: "04",
      title: "Sell Items",
      description: "Upload your items and manage listings",
      icon: Shirt
    },
    {
      number: "05",
      title: "Connect & Exchange",
      description: "Contact directly. No platform fees!",
      icon: Heart
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "Zero Platform Fees",
      description: "Keep 100% of your earnings"
    },
    {
      icon: Heart,
      title: "Donation Options",
      description: "Help fellow students in need"
    },
    {
      icon: Shield,
      title: "Student Community",
      description: "Safe, trusted peer-to-peer exchange"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-bg">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <motion.div 
            className="text-center text-white"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              variants={fadeInUp}
            >
              Welcome to <span className="text-yellow-300">EduCycle</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Your student-friendly marketplace to buy, sell, or donate used academic items like textbooks, calculators, lab coats, and more!
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button 
                size="lg" 
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 text-lg pulse-glow"
                onClick={() => navigate('/login')}
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 floating-animation">
          <div className="w-16 h-16 bg-yellow-400/20 rounded-full glass-effect"></div>
        </div>
        <div className="absolute top-40 right-20 floating-animation" style={{animationDelay: '2s'}}>
          <div className="w-12 h-12 bg-blue-400/20 rounded-full glass-effect"></div>
        </div>
        <div className="absolute bottom-20 left-1/4 floating-animation" style={{animationDelay: '4s'}}>
          <div className="w-20 h-20 bg-purple-400/20 rounded-full glass-effect"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">Why Choose EduCycle?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Built by students, for students. Experience the future of academic resource sharing.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">How It Works</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Get started in just 5 simple steps and join the student community today!
            </p>
          </motion.div>

          <motion.div 
            className="max-w-4xl mx-auto"
            initial="initial"
            whileInView="animate"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className="flex items-center mb-12 last:mb-0"
                variants={fadeInUp}
              >
                <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-8">
                  {step.number}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center mb-2">
                    <step.icon className="h-6 w-6 text-purple-600 mr-3" />
                    <h3 className="text-2xl font-semibold text-gray-800">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 text-lg">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">Get In Touch</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Have questions? We're here to help you succeed in your academic journey.
            </p>
          </motion.div>

          <motion.div 
            className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12"
            initial="initial"
            whileInView="animate"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl gradient-text">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-purple-600 mr-3" />
                    <div>
                      <p className="font-semibold">EduCycle Team</p>
                      <p className="text-gray-600">JNTUA College of Engineering, Anantapur</p>
                      <p className="text-gray-600">Andhra Pradesh, India – 515002</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-purple-600 mr-3" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <a href="mailto:support@educycle.in" className="text-purple-600 hover:underline">
                        support@educycle.in
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-purple-600 mr-3" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <a href="tel:+919876543210" className="text-purple-600 hover:underline">
                        +91-98765-43210
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl gradient-text">Follow Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <a href="#" className="flex items-center p-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
                      <Instagram className="h-6 w-6 mr-3" />
                      <span>Instagram</span>
                    </a>
                    <a href="#" className="flex items-center p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:shadow-lg transition-all">
                      <Linkedin className="h-6 w-6 mr-3" />
                      <span>LinkedIn</span>
                    </a>
                    <a href="#" className="flex items-center p-4 bg-gradient-to-r from-gray-800 to-black text-white rounded-lg hover:shadow-lg transition-all">
                      <Github className="h-6 w-6 mr-3" />
                      <span>GitHub</span>
                    </a>
                    <Button 
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      onClick={() => navigate('/login')}
                    >
                      Join Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold gradient-text mb-4">EduCycle</h3>
              <p className="text-gray-400">
                Empowering students through sustainable academic resource sharing.
              </p>
            </div>
            <div>
              <span className="text-lg font-semibold mb-4 block">Quick Links</span>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>
            <div>
              <span className="text-lg font-semibold mb-4 block">Support</span>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">User Guide / FAQ</a></li>
                <li><a href="mailto:support@educycle.in" className="text-gray-400 hover:text-white transition-colors">Contact Support</a></li>
              </ul>
            </div>
            <div>
              <span className="text-lg font-semibold mb-4 block">Ready to Start?</span>
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                onClick={() => navigate('/login')}
              >
                Join EduCycle Today
              </Button>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 EduCycle. Built with ❤️ for students, by students.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
