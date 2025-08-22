'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

// ✅ Dynamically import Lucide icons for better performance
const Crown = dynamic(() => import('lucide-react').then(mod => mod.Crown));
const Bed = dynamic(() => import('lucide-react').then(mod => mod.Bed));
const Bath = dynamic(() => import('lucide-react').then(mod => mod.Bath));
const Sparkles = dynamic(() => import('lucide-react').then(mod => mod.Sparkles));
const Waves = dynamic(() => import('lucide-react').then(mod => mod.Waves));
const Wind = dynamic(() => import('lucide-react').then(mod => mod.Wind));
const Sun = dynamic(() => import('lucide-react').then(mod => mod.Sun));
const Leaf = dynamic(() => import('lucide-react').then(mod => mod.Leaf));
const Wifi = dynamic(() => import('lucide-react').then(mod => mod.Wifi));
const Tv = dynamic(() => import('lucide-react').then(mod => mod.Tv));
const Snowflake = dynamic(() => import('lucide-react').then(mod => mod.Snowflake));
const Phone = dynamic(() => import('lucide-react').then(mod => mod.Phone));
const Shield = dynamic(() => import('lucide-react').then(mod => mod.Shield));
const Car = dynamic(() => import('lucide-react').then(mod => mod.Car));
const Utensils = dynamic(() => import('lucide-react').then(mod => mod.Utensils));
const Coffee = dynamic(() => import('lucide-react').then(mod => mod.Coffee));

const AmenitiesPreview = () => {
  const [selectedCategory, setSelectedCategory] = useState('luxury');

  // ✅ UseMemo to prevent recreation of static data on every render
  const amenityCategories = useMemo(
    () => ({
      luxury: [
        { icon: Crown, title: 'Premium Luxury', description: 'Five-star amenities and services throughout your stay' },
        { icon: Bed, title: 'King-Size Beds', description: 'Premium bedding with luxury linens and pillows' },
        { icon: Bath, title: 'Marble Bathrooms', description: 'Luxury bathrooms with rainfall showers' },
        { icon: Sparkles, title: 'Daily Housekeeping', description: 'Professional cleaning and maintenance services' },
      ],
      outdoor: [
        { icon: Waves, title: 'Direct Beach Access', description: 'Private pathway to pristine Varkala beach' },
        { icon: Wind, title: 'Private Terrace/Balcony', description: 'Exclusive outdoor space with breathtaking views' },
        { icon: Sun, title: 'Sunset Views', description: 'Unobstructed views of spectacular sunsets' },
        { icon: Leaf, title: 'Garden Views', description: 'Lush tropical gardens surrounding the property' },
      ],
      technology: [
        { icon: Wifi, title: 'High-Speed WiFi', description: 'Complimentary high-speed internet access' },
        { icon: Tv, title: 'Smart TV', description: 'Large smart TV with streaming services' },
        { icon: Snowflake, title: 'Climate Control', description: 'Individual AC and ceiling fans for comfort' },
        { icon: Phone, title: 'Concierge Service', description: '24/7 concierge for all your needs' },
      ],
      services: [
        { icon: Shield, title: '24/7 Security', description: 'Round-the-clock security and safety' },
        { icon: Car, title: 'Private Parking', description: 'Secure parking space for your vehicle' },
        { icon: Utensils, title: 'Kitchenette', description: 'Fully equipped modern kitchen facilities' },
        { icon: Coffee, title: 'Welcome Amenities', description: 'Complimentary refreshments and local treats' },
      ]
    }),
    []
  );

  return (
    <section className="bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LazyMotion features={domAnimation}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-black mb-6">
              Premium Amenities
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Every detail has been carefully curated to provide an unforgettable
              luxury experience at the South Cliff of Varkala, Kerala.
            </p>
          </motion.div>

          {/* Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-12 bg-gray-100 rounded-xl shadow-md border border-gray-300">
              <TabsTrigger value="luxury" className="text-black">Luxury</TabsTrigger>
              <TabsTrigger value="outdoor" className="text-black">Outdoor</TabsTrigger>
              <TabsTrigger value="technology" className="text-black">Technology</TabsTrigger>
              <TabsTrigger value="services" className="text-black">Services</TabsTrigger>
            </TabsList>

            {/* Amenity Cards */}
            {Object.entries(amenityCategories).map(([category, amenities]) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {amenities.map((amenity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                    >
                      <Card className="group hover:shadow-lg hover:scale-[1.02] transition-all duration-300 bg-white border border-gray-200 rounded-lg">
                        <CardContent className="p-6 text-center h-full flex flex-col">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-black text-white flex items-center justify-center">
                            <amenity.icon size={24} />
                          </div>
                          <h3 className="text-lg font-semibold text-black mb-2">{amenity.title}</h3>
                          <p className="text-gray-700 text-sm flex-grow">{amenity.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </LazyMotion>
      </div>
    </section>
  );
};

export default AmenitiesPreview;
