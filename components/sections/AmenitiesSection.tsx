'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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
  Snowflake,
  Phone,
  Shirt,
  Zap,
  Users,
  Camera,
  MapPin
} from 'lucide-react';

const AmenitiesSection = () => {
  const amenityCategories = [
    {
      title: 'Essential Amenities',
      items: [
        { icon: Crown, title: 'Premium Luxury', description: 'Five-star amenities and services throughout your stay', gradient: 'from-yellow-400 to-orange-500' },
        { icon: Wifi, title: 'High-Speed WiFi', description: 'Complimentary high-speed internet access throughout the property', gradient: 'from-purple-400 to-pink-500' },
        { icon: Car, title: 'Private Parking', description: 'Secure, dedicated parking space for your vehicle', gradient: 'from-gray-400 to-slate-500' },
        { icon: Shield, title: '24/7 Security', description: 'Round-the-clock security and safety monitoring', gradient: 'from-red-400 to-pink-500' },
      ]
    },
    {
      title: 'Room Features',
      items: [
        { icon: Bed, title: 'King-Size Beds', description: 'Premium king-size beds with luxury linens and pillows', gradient: 'from-blue-400 to-indigo-500' },
        { icon: Bath, title: 'Luxury Bathrooms', description: 'Marble bathrooms with rainfall showers and premium toiletries', gradient: 'from-cyan-400 to-blue-500' },
        { icon: Snowflake, title: 'Air Conditioning', description: 'Individual climate control and ceiling fans for comfort', gradient: 'from-sky-400 to-cyan-500' },
        { icon: Tv, title: 'Smart TV', description: 'Large smart TV with streaming services and cable channels', gradient: 'from-slate-400 to-gray-500' },
      ]
    },
    {
      title: 'Outdoor & Views',
      items: [
        { icon: Waves, title: 'Direct Beach Access', description: 'Private pathway to pristine Varkala beach', gradient: 'from-blue-400 to-cyan-500' },
        { icon: Wind, title: 'Private Terrace/Balcony', description: 'Exclusive outdoor space with breathtaking ocean views', gradient: 'from-green-400 to-teal-500' },
        { icon: Sun, title: 'Sunset Views', description: 'Unobstructed views of spectacular Arabian Sea sunsets', gradient: 'from-orange-400 to-red-500' },
        { icon: Camera, title: 'Scenic Views', description: 'Panoramic views of cliffs, ocean, and natural landscapes', gradient: 'from-emerald-400 to-green-500' },
      ]
    },
    {
      title: 'Services & Convenience',
      items: [
        { icon: Utensils, title: 'Kitchenette', description: 'Fully equipped modern kitchen with premium appliances', gradient: 'from-indigo-400 to-blue-500' },
        { icon: Sparkles, title: 'Daily Housekeeping', description: 'Professional cleaning and maintenance services', gradient: 'from-emerald-400 to-cyan-500' },
        { icon: Coffee, title: 'Welcome Amenities', description: 'Complimentary coffee, tea, and welcome refreshments', gradient: 'from-amber-400 to-orange-500' },
        { icon: Phone, title: 'Concierge Service', description: 'Personal concierge for bookings and recommendations', gradient: 'from-violet-400 to-purple-500' },
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

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800">Luxury Amenities</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Premium Amenities & Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every detail has been carefully curated to provide you with an unforgettable 
            luxury experience at the South Cliff of Varkala, Kerala.
          </p>
        </div>

        <div className="space-y-16">
          {amenityCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">{category.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.items.map((amenity, index) => (
                  <Card key={index} className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${amenity.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <amenity.icon className="text-white" size={24} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{amenity.title}</h3>
                      <p className="text-gray-600 text-sm">{amenity.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Additional Services Available</h2>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {additionalServices.map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
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