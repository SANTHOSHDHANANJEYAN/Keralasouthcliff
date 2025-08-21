'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Users, Bed, Bath } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import VirtualTour from '@/components/interactive/VirtualTour';

const VillasPreview = () => {
  const [selectedVilla, setSelectedVilla] = useState<number | null>(null);
  const [currentIndexes, setCurrentIndexes] = useState<{ [key: number]: number }>({});

  const villas = useMemo(
    () => [
      {
        id: 1,
        name: 'Ground Floor Villa',
        description:
          'Spacious luxury accommodation with direct beach access and private terrace. Experience the rhythm of waves with unparalleled comfort.',
        features: ['Private Terrace', 'Direct Beach Access', 'Ocean View', 'Luxury Amenities', '1 Bedrooms', '1 Bathrooms'],
        images: ['/astega/6-min.jpg', '/astega/11-min.jpg', '/astega/21-min.jpg'],
        rating: 4.9,
        maxGuests: 2,
        slug: 'sea-garden-room',
      },
      {
        id: 2,
        name: 'Top Floor Villa',
        description:
          'Elevated luxury with panoramic cliff views and private balcony. Watch the sunset over the Arabian Sea from your sanctuary.',
        features: ['Private Balcony', 'Panoramic Views', 'Sunset Views', 'Premium Luxury', '1 Bedrooms', '1 Bathrooms'],
        images: ['/astega/14-min.jpg', '/astega/28-min.jpg', '/astega/Ateya - Living area-min.png'],
        rating: 4.9,
        maxGuests: 2,
        slug: 'landscape-room',
      },
      {
        id: 3,
        name: 'Entire Villa',
        description:
          'Expansive villa with wide glass panels offering breathtaking coastal panoramas. Ideal for relaxation and gatherings.',
        features: ['Full Glass View', 'Private Garden', 'Infinity Pool Access', 'Luxury Interior', '2 Bedrooms', '2 Bathrooms'],
        images: ['/astega/5-min.jpg', '/astega/14-min.jpg', '/astega/19-min.jpg'],
        rating: 5.0,
        maxGuests: 4,
        slug: 'luxury-landscape',
        isLandscape: true,
      },
    ],
    []
  );

  // Auto-sliding images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndexes((prev) => {
        const updated = { ...prev };
        villas.forEach((villa) => {
          const current = updated[villa.id] ?? 0;
          updated[villa.id] = (current + 1) % villa.images.length;
        });
        return updated;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [villas]);

  return (
    <section className="bg-white pb-[3rem]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-extrabold tracking-tight text-black mb-4">Asteya Villas</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A peaceful sanctuary set on Kerala’s sun-kissed coast. Choose your experience — ground, sky, or panoramic luxury.
          </p>
        </motion.div>

        {/* Regular Villas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {villas.slice(0, 2).map((villa) => {
            const currentIndex = currentIndexes[villa.id] ?? 0;
            return (
              <Card
                key={villa.id}
                className="overflow-hidden rounded-2xl border border-gray-200"
              >
                <div className="relative h-72 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={villa.images[currentIndex]}
                        alt={villa.name}
                        fill
                        className="object-cover rounded-t-2xl"
                        onClick={() => setSelectedVilla(villa.id)}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Rating */}
                  <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-gray-300 flex items-center gap-1">
                    <Star size={16} className="text-yellow-500" />
                    <span className="text-sm font-medium">{villa.rating}</span>
                  </div>

                  {/* Image dots */}
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {villa.images.map((_, idx) => (
                      <span
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          currentIndex === idx ? 'bg-white shadow-md' : 'bg-white/40'
                        }`}
                      ></span>
                    ))}
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex flex-col gap-2 mb-4">
                    <h3 className="text-2xl font-bold text-black">{villa.name}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users size={16} /> {villa.maxGuests} guests
                      </span>
                      <span className="flex items-center gap-1">
                        <Bed size={16} /> 1 bed
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath size={16} /> 1 bath
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{villa.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {villa.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="rounded-full border-gray-400 text-gray-700">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/villas/${villa.slug}`} passHref>
                    <Button asChild className="mt-6 w-full bg-black text-white hover:bg-gray-800 rounded-full">
                      <a>Book Now</a>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Landscape Villa */}
        {villas.filter((v) => v.isLandscape).map((villa) => {
          const currentIndex = currentIndexes[villa.id] ?? 0;
          return (
            <div
              key={villa.id}
              className="overflow-hidden rounded-2xl border border-gray-200 flex flex-col md:flex-row"
            >
              <div className="md:w-1/2 relative overflow-hidden h-72 md:h-[500px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={villa.images[currentIndex]}
                      alt={villa.name}
                      fill
                      className="object-cover rounded-l-2xl"
                      onClick={() => setSelectedVilla(villa.id)}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Rating */}
                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-gray-300 flex items-center gap-1">
                  <Star size={16} className="text-yellow-500" />
                  <span className="text-sm font-medium">{villa.rating}</span>
                </div>

                {/* Image dots */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {villa.images.map((_, idx) => (
                    <span
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentIndex === idx ? 'bg-white shadow-md' : 'bg-white/40'
                      }`}
                    ></span>
                  ))}
                </div>
              </div>

              <CardContent className="md:w-1/2 p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-black mb-3">{villa.name}</h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Users size={16} /> {villa.maxGuests} guests
                    </span>
                    <span className="flex items-center gap-1">
                      <Bed size={16} /> 2 beds
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath size={16} /> 2 baths
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">{villa.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {villa.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="rounded-full border-gray-400 text-gray-700">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Link href={`/villas/${villa.slug}`} passHref>
                  <Button asChild className="mt-8 bg-black text-white hover:bg-gray-800 rounded-full w-full md:w-auto px-6 py-2">
                    <a>Book Now</a>
                  </Button>
                </Link>
              </CardContent>
            </div>
          );
        })}

        {/* Virtual Tour */}
        {selectedVilla && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedVilla(null)}
          >
            <motion.div
              className="bg-white w-full max-w-4xl rounded-xl shadow-lg relative border border-black p-6"
              initial={{ scale: 0.95 }}
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
                villaType={
                  selectedVilla === 1
                    ? 'ground-floor'
                    : selectedVilla === 2
                    ? 'top-floor'
                    : 'landscape'
                }
              />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default VillasPreview;
