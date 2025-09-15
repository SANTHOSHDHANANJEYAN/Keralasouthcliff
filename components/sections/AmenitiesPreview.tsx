'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

// ✅ Dynamically import Lucide icons for better performance
const Bed = dynamic(() => import('lucide-react').then(mod => mod.Bed));
const Bath = dynamic(() => import('lucide-react').then(mod => mod.Bath));
const Sparkles = dynamic(() => import('lucide-react').then(mod => mod.Sparkles));
const Waves = dynamic(() => import('lucide-react').then(mod => mod.Waves));
const Wind = dynamic(() => import('lucide-react').then(mod => mod.Wind));
const Sun = dynamic(() => import('lucide-react').then(mod => mod.Sun));
const Leaf = dynamic(() => import('lucide-react').then(mod => mod.Leaf));
const Wifi = dynamic(() => import('lucide-react').then(mod => mod.Wifi));
const Snowflake = dynamic(() => import('lucide-react').then(mod => mod.Snowflake));
const Shield = dynamic(() => import('lucide-react').then(mod => mod.Shield));
const Car = dynamic(() => import('lucide-react').then(mod => mod.Car));
const Utensils = dynamic(() => import('lucide-react').then(mod => mod.Utensils));
const Coffee = dynamic(() => import('lucide-react').then(mod => mod.Coffee));
const Refrigerator = dynamic(() => import('lucide-react').then(mod => mod.Refrigerator));
const Thermometer = dynamic(() => import('lucide-react').then(mod => mod.Thermometer));
const Box = dynamic(() => import('lucide-react').then(mod => mod.Box));
const Shirt = dynamic(() => import('lucide-react').then(mod => mod.Shirt));

const AmenitiesPreview = () => {
  const [selectedCategory, setSelectedCategory] = useState('included');

  // ✅ UseMemo to prevent recreation of static data on every render
  const amenityCategories = useMemo(
    () => ({
      included: [
        { icon: Thermometer, title: 'Hair dryer', description: 'Powerful hair dryer for your convenience' },
        { icon: Refrigerator, title: 'Refrigerator', description: 'Keep your drinks and snacks cool' },
        { icon: Utensils, title: 'Kitchenette', description: 'Fully equipped with dishes and silverware' },
        { icon: Coffee, title: 'Kettle', description: 'Electric kettle for your tea and coffee cravings' },
      ],
      features: [
        { icon: Bed, title: 'King-Size Beds', description: 'Premium king-size beds with luxury linens' },
        { icon: Bath, title: 'Luxury Bathrooms', description: 'Marble bathrooms with rainfall showers' },
        { icon: Snowflake, title: 'Air Conditioning & Fan', description: 'Climate control and ceiling fans' },
        { icon: Shield, title: 'CCTV 24 hours', description: '24-hour surveillance for your safety' },
      ],
      essentials: [
        { icon: Box, title: 'Essentials', description: 'Towels, bed sheets, soap, and toilet paper' },
        { icon: Shirt, title: 'Hangers & Storage', description: 'Hangers and clothing storage' },
        { icon: Sparkles, title: 'Cleaning products', description: 'Eco-friendly cleaning products provided' },
        { icon: Wifi, title: 'High-Speed WiFi', description: 'Complimentary high-speed internet access' },
      ],
      outdoor: [
        { icon: Waves, title: 'Direct Beach Access', description: 'Private pathway to pristine Varkala beach' },
        { icon: Wind, title: 'Private Terrace/Balcony', description: 'Exclusive outdoor space with ocean views' },
        { icon: Sun, title: 'Sunset Views', description: 'Unobstructed views of spectacular sunsets' },
        { icon: Car, title: 'Private Parking', description: 'Secure, dedicated parking space' },
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
              <TabsTrigger value="included" className="text-black">Included</TabsTrigger>
              <TabsTrigger value="features" className="text-black">Features</TabsTrigger>
              <TabsTrigger value="essentials" className="text-black">Essentials</TabsTrigger>
              <TabsTrigger value="outdoor" className="text-black">Outdoor</TabsTrigger>
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
