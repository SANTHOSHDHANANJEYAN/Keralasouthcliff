'use client';

import React, { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Maximize, Waves, Play, Star, Users, Bed, Bath } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Villa3DModel from '@/components/3d/Villa3DModel';
import VirtualTour from '@/components/interactive/VirtualTour';

const VillasPreview = () => {
  const [selectedVilla, setSelectedVilla] = useState<number | null>(null);

  const primaryColor = '#627d6a';

  const villas = [
    {
      id: 1,
      name: 'Ground Floor Villa',
      description:
        'Spacious luxury accommodation with direct beach access and private terrace. Experience the rhythm of waves at ground level with unparalleled comfort.',
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
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-[#e1ede4] text-[#627d6a] text-lg px-4 py-2">Asteya Retreat Villas</Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
            Only 2 Villas — Asteya Luxury
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            A peaceful sanctuary set on Kerala’s sun-kissed coast. Choose your experience — ground or sky.
          </p>
        </motion.div>

        {/* 3D Models */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {villas.map((villa, index) => (
            <motion.div
              key={villa.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-0 bg-[#f3f7f4]">
                  <h3 className="text-xl font-bold text-center text-gray-900 py-4">{villa.name}</h3>
                  <Suspense fallback={<div className="h-96 bg-gray-200 animate-pulse" />}>
                    <Villa3DModel isGroundFloor={villa.isGroundFloor} />
                  </Suspense>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Villa Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {villas.map((villa) => (
            <motion.div
              key={villa.id}
              initial={{ opacity: 0, x: villa.id === 1 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="relative">
              <Image
                src={villa.image}
                alt={villa.name}
                width={800}
                height={320}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                onClick={() => setSelectedVilla(villa.id)}
              />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-[#627d6a] text-white px-3 py-1">{villa.price}/night</Badge>
                  </div>
                  <div className="absolute top-4 left-4 bg-white/90 rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{villa.rating}</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Button
                      size="sm"
                      onClick={() => setSelectedVilla(villa.id)}
                      className="bg-white/30 text-white backdrop-blur-md hover:bg-white/40"
                    >
                      <Play size={16} className="mr-2" />
                      Virtual Tour
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{villa.name}</h3>
                    <div className="flex gap-3 text-sm text-gray-600">
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
                  <p className="text-gray-600 mb-4">{villa.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {villa.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        {selectedVilla && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedVilla(null)}
          >
            <motion.div
              className="bg-white p-4 rounded-xl shadow-lg max-w-4xl w-full relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                className="absolute top-4 right-4"
                onClick={() => setSelectedVilla(null)}
              >
                ✕
              </Button>
              <VirtualTour villaType={selectedVilla === 1 ? 'ground-floor' : 'top-floor'} />
            </motion.div>
          </motion.div>
        )}

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-center mb-6">Villa Comparison</h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 py-3 font-semibold">Feature</th>
                    <th className="px-4 py-3 text-center">Ground Floor</th>
                    <th className="px-4 py-3 text-center">Top Floor</th>
                  </tr>
                </thead>
                <tbody className="text-center text-gray-700">
                  <tr className="border-t">
                    <td className="py-3 px-4 text-left">Beach Access</td>
                    <td>Direct</td>
                    <td>Via stairs</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 px-4 text-left">View</td>
                    <td>Beach Level</td>
                    <td>Cliff Panoramic</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 px-4 text-left">Outdoor</td>
                    <td>Terrace</td>
                    <td>Balcony</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 px-4 text-left">Sunset</td>
                    <td>Partial</td>
                    <td>Unobstructed</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 px-4 text-left font-bold">Price</td>
                    <td className="text-[#627d6a] font-semibold">Rs.8,500</td>
                    <td className="text-[#627d6a] font-semibold">Rs.8,500</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
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
              className="border-[#627d6a] text-[#627d6a] hover:bg-[#627d6a] hover:text-white px-8 py-4 text-lg"
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
