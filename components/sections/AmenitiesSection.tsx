'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Shield,
  Wind,
  Crown,
  Sparkles,
  Coffee,
  Bath,
  Refrigerator,
  Utensils,
  Shirt, // ✅ replaces Hanger
  Droplet,
  Package,
  Camera,
} from 'lucide-react';

const AmenitiesSection = () => {
  const amenityCategories = [
    {
      title: 'Essential Amenities',
      items: [
        { icon: Bath, title: 'Luxury Bathrooms', description: 'High-end bathrooms with premium fittings' },
        { icon: Sparkles, title: 'Cleaning Products', description: 'All cleaning essentials provided' },
        { icon: Package, title: 'Extra Pillows & Blankets', description: 'Added comfort for your stay' },
        { icon: Shirt, title: 'Clothing Storage', description: 'Ample space for your clothes and belongings' }, // ✅
      ]
    },
    {
      title: 'Room Features',
      items: [
        { icon: Wind, title: 'Air Conditioning', description: 'Cool and comfortable rooms' },
        { icon: Shield, title: 'CCTV Camera - Exterior', description: '24/7 exterior surveillance for safety' },
        { icon: Coffee, title: 'Hot Water Kettle', description: 'Enjoy hot water anytime with the kettle' },
        { icon: Crown, title: 'Hair Dryer', description: 'Hair dryer provided in-room' },
      ]
    },
    {
      title: 'Convenience',
      items: [
        { icon: Sparkles, title: 'Laundry', description: 'Laundry facility available' },
        { icon: Utensils, title: 'Dishes & Silverware', description: 'Dining utensils provided for convenience' },
        { icon: Refrigerator, title: 'Refrigerator', description: 'Store your food & beverages easily' },
        { icon: Droplet, title: 'Kettle', description: 'Brew tea or coffee anytime' },
      ]
    },
    {
      title: 'Services & Concierge',
      items: [
        { icon: Camera, title: 'CCTV Camera - Exterior', description: 'Security cameras on premises' },
        { icon: Sparkles, title: 'Essentials', description: 'Basic essentials stocked for your stay' },
        { icon: Coffee, title: '12/7 Concierge', description: 'Concierge available for all your needs' },
      ]
    }
  ];

  const additionalServices = [
    'Airport transfer arrangements',
    'Local tour bookings',
    'Restaurant reservations',
    'Yoga and meditation sessions',
    'Ayurvedic spa treatments'
  ];

  return (
    <section className="pb-[6rem] bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Premium Amenities & Services
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Every detail has been carefully curated to provide you with an unforgettable
            luxury experience at the South Cliff of Varkala, Kerala.
          </p>
        </div>

        <div className="space-y-16">
          {amenityCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-bold text-black mb-8 text-center">{category.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.items.map((amenity, index) => (
                  <Card
                    key={index}
                    className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-300 bg-white"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <amenity.icon size={24} />
                      </div>
                      <h3 className="text-lg font-semibold text-black mb-2">{amenity.title}</h3>
                      <p className="text-gray-700 text-sm">{amenity.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
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
};

export default AmenitiesSection;
