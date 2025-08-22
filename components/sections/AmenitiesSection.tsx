'use client';

import React, { memo } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

// Dynamically import Lucide icons for performance optimization
const Icons = {
  Wifi: dynamic(() => import('lucide-react').then((mod) => mod.Wifi)),
  Car: dynamic(() => import('lucide-react').then((mod) => mod.Car)),
  Utensils: dynamic(() => import('lucide-react').then((mod) => mod.Utensils)),
  Shield: dynamic(() => import('lucide-react').then((mod) => mod.Shield)),
  Waves: dynamic(() => import('lucide-react').then((mod) => mod.Waves)),
  Wind: dynamic(() => import('lucide-react').then((mod) => mod.Wind)),
  Crown: dynamic(() => import('lucide-react').then((mod) => mod.Crown)),
  Sparkles: dynamic(() => import('lucide-react').then((mod) => mod.Sparkles)),
  Coffee: dynamic(() => import('lucide-react').then((mod) => mod.Coffee)),
  Bed: dynamic(() => import('lucide-react').then((mod) => mod.Bed)),
  Bath: dynamic(() => import('lucide-react').then((mod) => mod.Bath)),
  Sun: dynamic(() => import('lucide-react').then((mod) => mod.Sun)),
  Tv: dynamic(() => import('lucide-react').then((mod) => mod.Tv)),
  Snowflake: dynamic(() => import('lucide-react').then((mod) => mod.Snowflake)),
  Phone: dynamic(() => import('lucide-react').then((mod) => mod.Phone)),
  Camera: dynamic(() => import('lucide-react').then((mod) => mod.Camera)),
};

const amenityCategories = [
  {
    title: 'Essential Amenities',
    items: [
      { icon: 'Crown', title: 'Premium Luxury', description: 'Five-star amenities and services throughout your stay' },
      { icon: 'Wifi', title: 'High-Speed WiFi', description: 'Complimentary high-speed internet access throughout the property' },
      { icon: 'Car', title: 'Private Parking', description: 'Secure, dedicated parking space for your vehicle' },
      { icon: 'Shield', title: '24/7 Security', description: 'Round-the-clock security and safety monitoring' },
    ]
  },
  {
    title: 'Room Features',
    items: [
      { icon: 'Bed', title: 'King-Size Beds', description: 'Premium king-size beds with luxury linens and pillows' },
      { icon: 'Bath', title: 'Luxury Bathrooms', description: 'Marble bathrooms with rainfall showers and premium toiletries' },
      { icon: 'Snowflake', title: 'Air Conditioning', description: 'Individual climate control and ceiling fans for comfort' },
      { icon: 'Tv', title: 'Smart TV', description: 'Large smart TV with streaming services and cable channels' },
    ]
  },
  {
    title: 'Outdoor & Views',
    items: [
      { icon: 'Waves', title: 'Direct Beach Access', description: 'Private pathway to pristine Varkala beach' },
      { icon: 'Wind', title: 'Private Terrace/Balcony', description: 'Exclusive outdoor space with breathtaking ocean views' },
      { icon: 'Sun', title: 'Sunset Views', description: 'Unobstructed views of spectacular Arabian Sea sunsets' },
      { icon: 'Camera', title: 'Scenic Views', description: 'Panoramic views of cliffs, ocean, and natural landscapes' },
    ]
  },
  {
    title: 'Services & Convenience',
    items: [
      { icon: 'Utensils', title: 'Kitchenette', description: 'Fully equipped modern kitchen with premium appliances' },
      { icon: 'Sparkles', title: 'Daily Housekeeping', description: 'Professional cleaning and maintenance services' },
      { icon: 'Coffee', title: 'Welcome Amenities', description: 'Complimentary coffee, tea, and welcome refreshments' },
      { icon: 'Phone', title: 'Concierge Service', description: 'Personal concierge for bookings and recommendations' },
    ]
  }
];

const additionalServices = [
  'Airport transfer arrangements',
  'Local tour bookings',
  'Restaurant reservations',
  'Laundry and dry cleaning',
  'Yoga and meditation sessions',
  'Ayurvedic spa treatments',
  'Cooking classes',
  'Photography services'
];

const AmenitiesSection = memo(() => {
  return (
    <section className="pb-[6rem] bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Premium Amenities & Services
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Every detail has been carefully curated to provide you with an unforgettable 
            luxury experience at the South Cliff of Varkala, Kerala.
          </p>
        </motion.div>

        {/* Amenity Categories */}
        <div className="space-y-16">
          {amenityCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-black mb-8 text-center">
                {category.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.items.map((amenity, index) => {
                  const Icon = Icons[amenity.icon];
                  return (
                    <Card
                      key={index}
                      className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-300 bg-white"
                    >
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          {Icon && <Icon size={24} />}
                        </div>
                        <h3 className="text-lg font-semibold text-black mb-2">
                          {amenity.title}
                        </h3>
                        <p className="text-gray-700 text-sm">{amenity.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-black mb-8 text-center">Additional Services Available</h2>
          <Card className="max-w-4xl mx-auto border border-gray-300 bg-white">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {additionalServices.map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-black rounded-full flex-shrink-0" />
                    <span className="text-gray-800">{service}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
});

AmenitiesSection.displayName = 'AmenitiesSection';
export default AmenitiesSection;
