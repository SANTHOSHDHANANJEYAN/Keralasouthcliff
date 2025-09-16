'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

// ✅ Dynamically import Lucide icons for better performance
const Crown = dynamic(() => import('lucide-react').then(mod => mod.Crown));
const Bath = dynamic(() => import('lucide-react').then(mod => mod.Bath));
const Sparkles = dynamic(() => import('lucide-react').then(mod => mod.Sparkles));
const Hanger = dynamic(() => import('lucide-react').then(mod => mod.Hanger));
const Wind = dynamic(() => import('lucide-react').then(mod => mod.Wind));
const Snowflake = dynamic(() => import('lucide-react').then(mod => mod.Snowflake));
const Refrigerator = dynamic(() => import('lucide-react').then(mod => mod.Fridge));
const Utensils = dynamic(() => import('lucide-react').then(mod => mod.Utensils));
const Shield = dynamic(() => import('lucide-react').then(mod => mod.Shield));
const Phone = dynamic(() => import('lucide-react').then(mod => mod.Phone));
const Droplet = dynamic(() => import('lucide-react').then(mod => mod.Droplet));
const Coffee = dynamic(() => import('lucide-react').then(mod => mod.Coffee));
const Package = dynamic(() => import('lucide-react').then(mod => mod.Package));

const AmenitiesPreview = () => {
  const [selectedCategory, setSelectedCategory] = useState('luxury');

  // ✅ Only the amenities you asked for
  const amenityCategories = useMemo(
    () => ({
      luxury: [
        { icon: Crown, title: 'Luxury Bathrooms', description: 'High-end bathrooms with premium fittings' },
        { icon: Sparkles, title: 'Cleaning Products', description: 'All cleaning essentials provided' },
        { icon: Droplet, title: 'Hot Water Kettle', description: 'Enjoy hot water anytime with the kettle' },
        { icon: Package, title: 'Extra Pillows & Blankets', description: 'Added comfort for your stay' },
      ],
      outdoor: [
        { icon: Shield, title: 'CCTV Camera - Exterior', description: '24/7 exterior surveillance for safety' },
        { icon: Hanger, title: 'Clothing Storage', description: 'Ample space for your clothes and belongings' },
        { icon: Sparkles, title: 'Laundry', description: 'Laundry facility available' },
        { icon: Package, title: 'Essentials', description: 'Basic essentials stocked for your stay' },
      ],
      technology: [
        { icon: Snowflake, title: 'Air Conditioning', description: 'Cool and comfortable rooms' },
        { icon: Wind, title: 'Ceiling Fan', description: 'Ceiling fans for natural airflow' },
        { icon: Phone, title: '12/7 Concierge', description: 'Concierge available for all your needs' },
        { icon: Refrigerator, title: 'Refrigerator', description: 'Store your food & beverages easily' },
      ],
      services: [
        { icon: Utensils, title: 'Dishes & Silverware', description: 'Dining utensils provided for convenience' },
        { icon: Coffee, title: 'Kettle', description: 'Brew tea or coffee anytime' },
        { icon: Sparkles, title: 'Hair Dryer', description: 'Hair dryer provided in-room' },
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
