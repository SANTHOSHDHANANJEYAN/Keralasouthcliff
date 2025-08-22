'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import VirtualTour from '@/components/interactive/VirtualTour';

const VillasPreview = () => {
  const [selectedVilla, setSelectedVilla] = useState<number | null>(null);
  const [currentIndexes, setCurrentIndexes] = useState<{ [key: number]: number }>({});

  // Villas Data
  const villas = useMemo(
    () => [
      {
        id: 1,
        name: 'Ground Floor Villa',
        description: 'Spacious luxury with beach access and private terrace.',
        features: ['Private Terrace', 'Beach Access', 'Ocean View', 'Luxury Amenities', '1 Bedroom', '1 Bathroom'],
        images: ['/astega/6-min.webp', '/astega/11-min.webp', '/astega/21-min.webp'], // Use WebP for better quality & speed
        rating: 4.9,
        maxGuests: 2,
        slug: 'sea-garden-room',
      },
      {
        id: 2,
        name: 'Top Floor Villa',
        description: 'Elevated stay with panoramic cliff views and private balcony.',
        features: ['Private Balcony', 'Panoramic Views', 'Sunset Views', 'Premium Luxury', '1 Bedroom', '1 Bathroom'],
        images: ['/astega/14-min.webp', '/astega/28-min.webp', '/astega/Ateya-Living-area-min.webp'],
        rating: 4.9,
        maxGuests: 2,
        slug: 'landscape-room',
      },
      {
        id: 3,
        name: 'Entire Villa',
        description: 'Expansive villa with glass panels and breathtaking views.',
        features: ['Full Glass View', 'Private Garden', 'Infinity Pool', 'Luxury Interior', '2 Bedrooms', '2 Bathrooms'],
        images: ['/astega/5-min.webp', '/astega/14-min.webp', '/astega/19-min.webp'],
        rating: 5.0,
        maxGuests: 4,
        slug: 'luxury-landscape',
        isLandscape: true,
      },
    ],
    []
  );

  // Auto-slide image carousel
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
    }, 6000);

    return () => clearInterval(interval);
  }, [villas]);

  return (
    <section className="bg-white pb-[3rem]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold tracking-tight text-black mb-4">Asteya Villas</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A peaceful sanctuary on Kerala’s sun-kissed coast.
          </p>
        </div>

        {/* Villa Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {villas.slice(0, 2).map((villa) => {
            const currentIndex = currentIndexes[villa.id] ?? 0;
            return (
              <Card key={villa.id} className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
                <div className="relative h-72 overflow-hidden">
                  {villa.images.map((img, idx) => (
                    <div
                      key={idx}
                      className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                        idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={villa.name}
                        fill
                        quality={85} // Sharper images
                        priority={idx === 0} // Preload first image
                        placeholder="blur"
                        blurDataURL="/blur-placeholder.webp"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover rounded-t-2xl cursor-pointer"
                        onClick={() => setSelectedVilla(villa.id)}
                      />
                    </div>
                  ))}

                  {/* Rating */}
                  <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full border border-gray-300 flex items-center gap-1 shadow-md">
                    <Star size={16} className="text-yellow-500" />
                    <span className="text-sm font-medium">{villa.rating}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30">
                    <div className="h-full bg-white animate-progress" key={currentIndex} />
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-black mb-2">{villa.name}</h3>
                  <p className="text-gray-600 mb-4">{villa.description}</p>
                  <Link href={`/villas/${villa.slug}`} passHref>
                    <Button asChild className="w-full bg-black text-white hover:bg-gray-800 rounded-full shadow-md">
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
            <div key={villa.id} className="overflow-hidden rounded-2xl border border-gray-200 flex flex-col md:flex-row shadow-lg">
              <div className="md:w-1/2 relative overflow-hidden h-72 md:h-[500px]">
                {villa.images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={villa.name}
                      fill
                      quality={85}
                      placeholder="blur"
                      blurDataURL="/blur-placeholder.webp"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                      className="object-cover rounded-l-2xl cursor-pointer"
                      onClick={() => setSelectedVilla(villa.id)}
                    />
                  </div>
                ))}

                {/* Rating */}
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full border border-gray-300 flex items-center gap-1 shadow-md">
                  <Star size={16} className="text-yellow-500" />
                  <span className="text-sm font-medium">{villa.rating}</span>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30">
                  <div className="h-full bg-white animate-progress" key={currentIndex} />
                </div>
              </div>

              <CardContent className="md:w-1/2 p-8 flex flex-col justify-between">
                <h3 className="text-3xl font-bold text-black mb-3">{villa.name}</h3>
                <p className="text-gray-600 mb-6">{villa.description}</p>
                <Link href={`/villas/${villa.slug}`} passHref>
                  <Button asChild className="mt-8 bg-black text-white hover:bg-gray-800 rounded-full w-full md:w-auto px-6 py-2">
                    <a>Book Now</a>
                  </Button>
                </Link>
              </CardContent>
            </div>
          );
        })}

        {/* Virtual Tour Modal */}
        {selectedVilla && (
          <div
            className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
            onClick={() => setSelectedVilla(null)}
          >
            <div
              className="bg-white w-full max-w-4xl rounded-xl shadow-lg relative p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white text-black shadow-lg flex items-center justify-center text-xl font-bold z-50 hover:bg-gray-200"
                onClick={() => setSelectedVilla(null)}
              >
                ✕
              </button>
              <VirtualTour
                villaType={
                  selectedVilla === 1
                    ? 'ground-floor'
                    : selectedVilla === 2
                    ? 'top-floor'
                    : 'landscape'
                }
              />
            </div>
          </div>
        )}
      </div>

      {/* Animation Style */}
      <style jsx>{`
        @keyframes progressFill {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progressFill 6s linear forwards;
        }
      `}</style>
    </section>
  );
};

export default VillasPreview;
