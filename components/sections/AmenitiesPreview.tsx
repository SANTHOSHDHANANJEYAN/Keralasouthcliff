'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

// ✅ Dynamically import Lucide icons for better performance
const Wind = dynamic(() => import('lucide-react').then(mod => mod.Wind));          // Hair dryer
const Sparkles = dynamic(() => import('lucide-react').then(mod => mod.Sparkles));  // Cleaning products
const Laundry = dynamic(() => import('lucide-react').then(mod => mod.Washer));     // Laundry
const Package = dynamic(() => import('lucide-react').then(mod => mod.Package));    // Essentials
const Hanger = dynamic(() => import('lucide-react').then(mod => mod.Hanger));      // Hangers
const Pillow = dynamic(() => import('lucide-react').then(mod => mod.Pillow));      // Extra pillows
const Bath = dynamic(() => import('lucide-react').then(mod => mod.Bath));          // Luxury Bathrooms
const Box = dynamic(() => import('lucide-react').then(mod => mod.Box));            // Clothing storage
const Shield = dynamic(() => import('lucide-react').then(mod => mod.Shield));      // CCTV Cameras
const Snowflake = dynamic(() => import('lucide-react').then(mod => mod.Snowflake));// Air conditioning
const Fan = dynamic(() => import('lucide-react').then(mod => mod.Fan));            // Ceiling fan
const Refrigerator = dynamic(() => import('lucide-react').then(mod => mod.Refrigerator)); // Refrigerator
const Utensils = dynamic(() => import('lucide-react').then(mod => mod.Utensils));  // Dishes & silverware
const Phone = dynamic(() => import('lucide-react').then(mod => mod.Phone));        // 12/7 concierge
const Coffee = dynamic(() => import('lucide-react').then(mod => mod.Coffee));      // Hot water kettle
const CupSoda = dynamic(() => import('lucide-react').then(mod => mod.CupSoda));    // Kettle

const AmenitiesPreview = () => {
  // one category for all amenities
  const amenities = useMemo(
    () => [
      { icon: Wind, title: 'Hair Dryer' },
      { icon: Sparkles, title: 'Cleaning Products' },
      { icon: Laundry, title: 'Laundry' },
      { icon: Package, title: 'Essentials' },
      { icon: Hanger, title: 'Hangers' },
      { icon: Pillow, title: 'Extra Pillows & Blankets' },
      { icon: Bath, title: 'Luxury Bathrooms' },
      { icon: Box, title: 'Clothing Storage' },
      { icon: Shield, title: 'CCTV Camera - Exterior' },
      { icon: Snowflake, title: 'Air Conditioning' },
      { icon: Fan, title: 'Ceiling Fan' },
      { icon: Refrigerator, title: 'Refrigerator' },
      { icon: Utensils, title: 'Dishes & Silverware' },
      { icon: Phone, title: '12/7 Concierge for All Your Needs' },
      { icon: Coffee, title: 'Hot Water Kettle' },
      { icon: CupSoda, title: 'Kettle' },
    ],
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
              Amenities
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              All the essentials and thoughtful touches to make your stay comfortable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {amenities.map((amenity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="group hover:shadow-lg hover:scale-[1.02] transition-all duration-300 bg-white border border-gray-200 rounded-lg">
                  <CardContent className="p-6 text-center h-full flex flex-col">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-black text-white flex items-center justify-center">
                      <amenity.icon size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-black mb-2">{amenity.title}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </LazyMotion>
      </div>
    </section>
  );
};

export default AmenitiesPreview;
