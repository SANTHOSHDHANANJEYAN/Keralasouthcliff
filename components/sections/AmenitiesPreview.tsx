'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Wifi, Car, Utensils, Shield, Waves, Wind, Crown,
  Sparkles, Coffee, Bed, Bath, Sun, Tv, Phone, Snowflake, Users, Heart, Leaf
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const AmenitiesPreview = () => {
  const [selectedCategory, setSelectedCategory] = useState('luxury');

  const amenityCategories = {
    luxury: [
      { icon: Crown, title: 'Premium Luxury', description: 'Five-star amenities and services throughout your stay', gradient: 'from-[#7c8f83] to-[#627d6a]' },
      { icon: Bed, title: 'King-Size Beds', description: 'Premium bedding with luxury linens and pillows', gradient: 'from-[#a0b3a1] to-[#627d6a]' },
      { icon: Bath, title: 'Marble Bathrooms', description: 'Luxury bathrooms with rainfall showers', gradient: 'from-[#b8ccc0] to-[#627d6a]' },
      { icon: Sparkles, title: 'Daily Housekeeping', description: 'Professional cleaning and maintenance services', gradient: 'from-[#d4e1d5] to-[#627d6a]' },
    ],
    outdoor: [
      { icon: Waves, title: 'Direct Beach Access', description: 'Private pathway to pristine Varkala beach', gradient: 'from-[#9dc5a1] to-[#627d6a]' },
      { icon: Wind, title: 'Private Terrace/Balcony', description: 'Exclusive outdoor space with breathtaking views', gradient: 'from-[#b0caba] to-[#627d6a]' },
      { icon: Sun, title: 'Sunset Views', description: 'Unobstructed views of spectacular sunsets', gradient: 'from-[#e2c9b0] to-[#627d6a]' },
      { icon: Leaf, title: 'Garden Views', description: 'Lush tropical gardens surrounding the property', gradient: 'from-[#9bb897] to-[#627d6a]' },
    ],
    technology: [
      { icon: Wifi, title: 'High-Speed WiFi', description: 'Complimentary high-speed internet access', gradient: 'from-[#8fa8a1] to-[#627d6a]' },
      { icon: Tv, title: 'Smart TV', description: 'Large smart TV with streaming services', gradient: 'from-[#cfd4d1] to-[#627d6a]' },
      { icon: Snowflake, title: 'Climate Control', description: 'Individual AC and ceiling fans for comfort', gradient: 'from-[#aecdc4] to-[#627d6a]' },
      { icon: Phone, title: 'Concierge Service', description: '24/7 concierge for all your needs', gradient: 'from-[#9fbbb0] to-[#627d6a]' },
    ],
    services: [
      { icon: Shield, title: '24/7 Security', description: 'Round-the-clock security and safety', gradient: 'from-[#d99d9d] to-[#627d6a]' },
      { icon: Car, title: 'Private Parking', description: 'Secure parking space for your vehicle', gradient: 'from-[#b8c2bd] to-[#627d6a]' },
      { icon: Utensils, title: 'Kitchenette', description: 'Fully equipped modern kitchen facilities', gradient: 'from-[#a7bfb4] to-[#627d6a]' },
      { icon: Coffee, title: 'Welcome Amenities', description: 'Complimentary refreshments and local treats', gradient: 'from-[#d9c8ae] to-[#627d6a]' },
    ]
  };

  return (
    <section className="py-24 bg-gradient-to-b from-[#f8f9f7] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-[#dce2db] text-[#4a5b4e] text-lg px-4 py-2">Luxury Amenities</Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-[#2c3d34] mb-6">Premium Amenities</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Every detail has been carefully curated to provide an unforgettable 
            luxury experience at the South Cliff of Varkala, Kerala.
          </p>
        </motion.div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-12 bg-[#f0f4f0] rounded-xl shadow-md border border-gray-200">
            <TabsTrigger value="luxury">Luxury</TabsTrigger>
            <TabsTrigger value="outdoor">Outdoor</TabsTrigger>
            <TabsTrigger value="technology">Technology</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
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
                    <Card className="group hover:shadow-xl hover:scale-[1.015] transition-all duration-300 bg-white/90 border border-gray-200 rounded-lg">
                      <CardContent className="p-6 text-center h-full flex flex-col">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${amenity.gradient} flex items-center justify-center transition-transform duration-300`}>
                          <amenity.icon className="text-white" size={24} />
                        </div>
                        <h3 className="text-lg font-semibold text-[#2c3d34] mb-2">{amenity.title}</h3>
                        <p className="text-gray-600 text-sm flex-grow">{amenity.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-20"
        >
          <Link href="/amenities">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#627d6a] to-[#4f5f54] hover:from-[#51695d] hover:to-[#3c4d42] text-white px-8 py-4 text-lg"
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
