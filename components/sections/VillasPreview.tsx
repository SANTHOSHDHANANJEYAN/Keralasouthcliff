'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Star, Users, Bed, Bath } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import VirtualTour from '@/components/interactive/VirtualTour';

const VillasPreview = () => {
  const [selectedVilla, setSelectedVilla] = useState<number | null>(null);

  const villas = [
    {
      id: 1,
      name: 'Ground Floor Villa',
      description:
        'Spacious luxury accommodation with direct beach access and private terrace. Experience rhythm of waves at ground level with unparalleled comfort.',
      price: 'Rs.8,500',
      features: [
        'Private Terrace',
        'Direct Beach Access',
        'Ocean View',
        'Luxury Amenities',
        '2 Bedrooms',
        '2 Bathrooms',
      ],
      image: '/astega/7.jpg',
      rating: 4.9,
      maxGuests: 6,
      isGroundFloor: true,
    },
    {
      id: 2,
      name: 'Top Floor Villa',
      description:
        'Elevated luxury with panoramic cliff views and private balcony. Watch the sunset paint the Arabian Sea from your private sanctuary high above.',
      price: 'Rs.8,500',
      features: [
        'Private Balcony',
        'Panoramic Views',
        'Sunset Views',
        'Premium Luxury',
        '2 Bedrooms',
        '2 Bathrooms',
      ],
      image: '/astega/20.jpg',
      rating: 4.9,
      maxGuests: 6,
      isGroundFloor: false,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-4">
            Asteya Villas
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            A peaceful sanctuary set on Kerala’s sun-kissed coast. Choose your experience — ground or sky.
          </p>
        </motion.div>

        {/* Villas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {villas.map((villa, index) => (
            <motion.div
              key={villa.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="group hover:shadow-md hover:-translate-y-1 transition-all duration-500 border border-black">
                {/* Image Section */}
                <div className="relative">
                  <Image
                    src={villa.image}
                    alt={villa.name}
                    width={800}
                    height={320}
                    className="w-full h-64 sm:h-72 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                    onClick={() => setSelectedVilla(villa.id)}
                  />
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-black text-white px-3 py-1">
                      {villa.price}/night
                    </Badge>
                  </div>
                  {/* Rating */}
                  <div className="absolute top-4 left-4 bg-white border border-black rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-black" />
                    <span className="text-sm font-medium text-black">
                      {villa.rating}
                    </span>
                  </div>
                  {/* Virtual Tour Button */}
                  <div className="absolute bottom-4 left-4">
                    <Button
                      size="sm"
                      onClick={() => setSelectedVilla(villa.id)}
                      className="bg-white text-black border border-black backdrop-blur-sm hover:bg-gray-100"
                    >
                      <Play size={16} className="mr-2" />
                      Virtual Tour
                    </Button>
                  </div>
                </div>

                {/* Content Section */}
                <CardContent className="p-5 sm:p-6 bg-white">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-black">
                      {villa.name}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-700">
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        {villa.maxGuests} guests
                      </div>
                      <div className="flex items-center gap-1">
                        <Bed size={16} />
                        2 beds
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath size={16} />
                        2 baths
                      </div>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 mb-4">
                    {villa.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {villa.features.map((feature, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="text-xs border border-black text-black bg-white"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Virtual Tour Modal */}
        {selectedVilla && (
          <motion.div
            className="fixed inset-0 bg-white/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedVilla(null)}
          >
            <motion.div
              className="bg-white w-full max-w-4xl rounded-xl shadow-lg relative border border-black p-4 md:p-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                className="absolute top-4 right-4 text-black"
                onClick={() => setSelectedVilla(null)}
              >
                ✕
              </Button>
              <VirtualTour
                villaType={selectedVilla === 1 ? 'ground-floor' : 'top-floor'}
              />
            </motion.div>
          </motion.div>
        )}

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-10"
        >
          <Link href="/villas">
            <Button
              size="lg"
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white px-8 py-4 text-base sm:text-lg"
            >
              View All Villas
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default VillasPreview;
