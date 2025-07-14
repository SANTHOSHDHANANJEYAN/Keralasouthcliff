'use client';

import React, { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Maximize, Waves, Play, Star, Users, Bed, Bath } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Villa3DModel from '@/components/3d/Villa3DModel';
import VirtualTour from '@/components/interactive/VirtualTour';

const VillasPreview = () => {
  const villas = [
    {
      id: 1,
      name: 'Ground Floor Villa',
      description: 'Spacious luxury accommodation with direct beach access and private terrace. Experience the rhythm of waves at ground level with unparalleled comfort.',
      price: '$8,500',
      features: ['Private Terrace', 'Direct Beach Access', 'Ocean View', 'Luxury Amenities', '2 Bedrooms', '2 Bathrooms'],
      image: 'https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg',
      rating: 4.9,
      maxGuests: 4,
      isGroundFloor: true
    },
    {
      id: 2,
      name: 'Top Floor Villa',
      description: 'Elevated luxury with panoramic cliff views and private balcony. Watch the sunset paint the Arabian Sea from your private sanctuary high above.',
      price: '$8,500',
      features: ['Private Balcony', 'Panoramic Views', 'Sunset Views', 'Premium Luxury', '2 Bedrooms', '2 Bathrooms'],
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      rating: 4.9,
      maxGuests: 4,
      isGroundFloor: false
    }
  ];

  const [selectedVilla, setSelectedVilla] = React.useState(null);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-blue-100 text-blue-800 text-lg px-4 py-2">Exclusive Accommodation</Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Only 2 Luxury Villas Available
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Each villa offers a unique perspective of Kerala's stunning coastline, 
            designed for the most discerning travelers seeking unparalleled luxury and comfort.
          </p>
        </motion.div>

        {/* 3D Villa Models */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {villas.map((villa, index) => (
            <motion.div
              key={villa.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{villa.name}</h3>
                    <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg" />}>
                      <Villa3DModel isGroundFloor={villa.isGroundFloor} />
                    </Suspense>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Villa Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {villas.map((villa) => (
            <motion.div
              key={villa.id}
              initial={{ opacity: 0, x: villa.id === 1 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="relative">
                  <img 
                    src={villa.image} 
                    alt={villa.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-blue-600 to-teal-600 text-white text-lg px-4 py-2">
                      {villa.price}/night
                    </Badge>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{villa.rating}</span>
                    </div>
                  </div>

                  {/* Virtual Tour Button */}
                  <div className="absolute bottom-4 left-4">
                    <Button
                      size="sm"
                      onClick={() => setSelectedVilla(villa.id)}
                      className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
                    >
                      <Play className="mr-2" size={16} />
                      Virtual Tour
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">{villa.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span>{villa.maxGuests} guests</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bed size={16} />
                        <span>2 beds</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath size={16} />
                        <span>2 baths</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{villa.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {villa.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs px-3 py-1">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white">
                      Book Now
                    </Button>
                    <Button variant="outline" size="sm" className="px-4">
                      <Eye size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Virtual Tour Modal */}
        {selectedVilla && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVilla(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex justify-end">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedVilla(null)}
                  className="text-white hover:bg-white/20"
                >
                  ✕
                </Button>
              </div>
              <VirtualTour villaType={selectedVilla === 1 ? 'ground-floor' : 'top-floor'} />
            </motion.div>
          </motion.div>
        )}

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Villa Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-4">Feature</th>
                      <th className="text-center py-4 px-4">Ground Floor Villa</th>
                      <th className="text-center py-4 px-4">Top Floor Villa</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-4 px-4 font-medium">Beach Access</td>
                      <td className="py-4 px-4 text-center">Direct</td>
                      <td className="py-4 px-4 text-center">Via stairs</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-4 font-medium">Outdoor Space</td>
                      <td className="py-4 px-4 text-center">Private Terrace</td>
                      <td className="py-4 px-4 text-center">Private Balcony</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-4 font-medium">View</td>
                      <td className="py-4 px-4 text-center">Beach Level</td>
                      <td className="py-4 px-4 text-center">Panoramic Cliff</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-4 font-medium">Sunset Views</td>
                      <td className="py-4 px-4 text-center">Partial</td>
                      <td className="py-4 px-4 text-center">Unobstructed</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-medium">Price per night</td>
                      <td className="py-4 px-4 text-center font-bold text-blue-600">$8,500</td>
                      <td className="py-4 px-4 text-center font-bold text-blue-600">$8,500</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Special Offers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Early Bird Special</h4>
                <p className="text-sm text-gray-600">Book 30 days in advance and save 15%</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Waves className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Extended Stay</h4>
                <p className="text-sm text-gray-600">Stay 7+ nights and get complimentary spa treatment</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Honeymoon Package</h4>
                <p className="text-sm text-gray-600">Special romantic amenities and sunset dinner</p>
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
          <Link href="/villas">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg"
            >
              View All Villa Details
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default VillasPreview;