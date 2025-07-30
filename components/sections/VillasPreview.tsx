'use client';

import React, { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Maximize, Waves, Play, Star, Users, Bed, Bath } from 'lucide-react';
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
        'Spacious luxury accommodation with direct beach access and private terrace.Experience rhythm of waves at ground level with unparalleled comfort.',
      price: 'Rs.8,500',
      features: [
        'Private Terrace',
        'Direct Beach Access',
        'Ocean View',
        'Luxury Amenities',
        '2 Bedrooms',
        '2 Bathrooms',
      ],
      image: '/Asteya -website/PDF - Asteya-4.png',
      rating: 4.9,
      maxGuests: 4,
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
      image: '/Asteya -website/PDF - Asteya-2.png',
      rating: 4.9,
      maxGuests: 4,
      isGroundFloor: false,
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          
          <h2 className="text-5xl md:text-6xl font-bold text-black mb-6">
            Asteya Villas
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto">
            A peaceful sanctuary set on Kerala’s sun-kissed coast. Choose your experience — ground or sky.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {villas.map((villa, index) => (
            <motion.div
              key={villa.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >

            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {villas.map((villa) => (
            <motion.div
              key={villa.id}
              initial={{ opacity: 0, x: villa.id === 1 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="group hover:shadow-md hover:-translate-y-1 transition-all duration-500 border border-black">
                <div className="relative">
                  <Image
                    src={villa.image}
                    alt={villa.name}
                    width={800}
                    height={320}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                    onClick={() => setSelectedVilla(villa.id)}
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-black text-white px-3 py-1">{villa.price}/night</Badge>
                  </div>
                  <div className="absolute top-4 left-4 bg-white border border-black rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-black" />
                    <span className="text-sm font-medium text-black">{villa.rating}</span>
                  </div>
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
                <CardContent className="p-6 bg-white">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-black">{villa.name}</h3>
                    <div className="flex gap-3 text-sm text-gray-700">
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
                  <p className="text-gray-700 mb-4">{villa.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {villa.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs border border-black text-black bg-white">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {selectedVilla && (
          <motion.div
            className="fixed inset-0 bg-white/90 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedVilla(null)}
          >
            <motion.div
              className="bg-white p-4 rounded-xl shadow-lg max-w-4xl w-full relative border border-black"
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
              <VirtualTour villaType={selectedVilla === 1 ? 'ground-floor' : 'top-floor'} />
            </motion.div>
          </motion.div>
        )}

        
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
              className="border-black text-black hover:bg-black hover:text-white px-8 py-4 text-lg"
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
