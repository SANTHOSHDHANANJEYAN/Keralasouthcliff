'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wifi, 
  Car, 
  Utensils, 
  Shield, 
  Waves, 
  Wind,
  Crown,
  Sparkles,
  Coffee,
  Bed,
  Bath,
  Sun,
  Tv,
  Phone,
  Snowflake,
  Users,
  Heart,
  Leaf
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const AmenitiesPreview = () => {
  const [selectedCategory, setSelectedCategory] = useState('luxury');

  const amenityCategories = {
    luxury: [
      {
        icon: Crown,
        title: 'Premium Luxury',
        description: 'Five-star amenities and services throughout your stay',
        gradient: 'from-yellow-400 to-orange-500'
      },
      {
        icon: Bed,
        title: 'King-Size Beds',
        description: 'Premium bedding with luxury linens and pillows',
        gradient: 'from-purple-400 to-pink-500'
      },
      {
        icon: Bath,
        title: 'Marble Bathrooms',
        description: 'Luxury bathrooms with rainfall showers',
        gradient: 'from-blue-400 to-cyan-500'
      },
      {
        icon: Sparkles,
        title: 'Daily Housekeeping',
        description: 'Professional cleaning and maintenance services',
        gradient: 'from-emerald-400 to-cyan-500'
      }
    ],
    outdoor: [
      {
        icon: Waves,
        title: 'Direct Beach Access',
        description: 'Private pathway to pristine Varkala beach',
        gradient: 'from-blue-400 to-cyan-500'
      },
      {
        icon: Wind,
        title: 'Private Terrace/Balcony',
        description: 'Exclusive outdoor space with breathtaking views',
        gradient: 'from-green-400 to-teal-500'
      },
      {
        icon: Sun,
        title: 'Sunset Views',
        description: 'Unobstructed views of spectacular sunsets',
        gradient: 'from-orange-400 to-red-500'
      },
      {
        icon: Leaf,
        title: 'Garden Views',
        description: 'Lush tropical gardens surrounding the property',
        gradient: 'from-green-500 to-emerald-500'
      }
    ],
    technology: [
      {
        icon: Wifi,
        title: 'High-Speed WiFi',
        description: 'Complimentary high-speed internet access',
        gradient: 'from-purple-400 to-pink-500'
      },
      {
        icon: Tv,
        title: 'Smart TV',
        description: 'Large smart TV with streaming services',
        gradient: 'from-slate-400 to-gray-500'
      },
      {
        icon: Snowflake,
        title: 'Climate Control',
        description: 'Individual AC and ceiling fans for comfort',
        gradient: 'from-sky-400 to-blue-500'
      },
      {
        icon: Phone,
        title: 'Concierge Service',
        description: '24/7 concierge for all your needs',
        gradient: 'from-indigo-400 to-purple-500'
      }
    ],
    services: [
      {
        icon: Shield,
        title: '24/7 Security',
        description: 'Round-the-clock security and safety',
        gradient: 'from-red-400 to-pink-500'
      },
      {
        icon: Car,
        title: 'Private Parking',
        description: 'Secure parking space for your vehicle',
        gradient: 'from-gray-400 to-slate-500'
      },
      {
        icon: Utensils,
        title: 'Kitchenette',
        description: 'Fully equipped modern kitchen facilities',
        gradient: 'from-indigo-400 to-blue-500'
      },
      {
        icon: Coffee,
        title: 'Welcome Amenities',
        description: 'Complimentary refreshments and local treats',
        gradient: 'from-amber-400 to-orange-500'
      }
    ]
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-emerald-100 text-emerald-800 text-lg px-4 py-2">Luxury Amenities</Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Premium Amenities
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Every detail has been carefully curated to provide you with an unforgettable 
            luxury experience at the South Cliff of Varkala, Kerala.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-12 bg-white shadow-lg">
              <TabsTrigger value="luxury" className="text-sm font-medium">Luxury</TabsTrigger>
              <TabsTrigger value="outdoor" className="text-sm font-medium">Outdoor</TabsTrigger>
              <TabsTrigger value="technology" className="text-sm font-medium">Technology</TabsTrigger>
              <TabsTrigger value="services" className="text-sm font-medium">Services</TabsTrigger>
            </TabsList>

            {Object.entries(amenityCategories).map(([category, amenities]) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {amenities.map((amenity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 h-full">
                        <CardContent className="p-6 text-center h-full flex flex-col">
                          <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${amenity.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <amenity.icon className="text-white" size={24} />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{amenity.title}</h3>
                          <p className="text-gray-600 text-sm flex-grow">{amenity.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Special Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20 mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Special Services</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-rose-50 to-pink-100 border-rose-200 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Heart className="w-12 h-12 text-rose-600 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-900 mb-3">Spa & Wellness</h4>
                <p className="text-gray-600 mb-4">Ayurvedic treatments and yoga sessions available on request</p>
                <Button variant="outline" size="sm" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-900 mb-3">Personal Chef</h4>
                <p className="text-gray-600 mb-4">Private chef service for authentic Kerala cuisine experiences</p>
                <Button variant="outline" size="sm" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                  Book Chef
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Car className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-900 mb-3">Transportation</h4>
                <p className="text-gray-600 mb-4">Airport transfers and local sightseeing arrangements</p>
                <Button variant="outline" size="sm" className="border-emerald-300 text-emerald-600 hover:bg-emerald-50">
                  Arrange Transfer
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Link href="/amenities">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 text-lg"
            >
              View All Amenities
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AmenitiesPreview;