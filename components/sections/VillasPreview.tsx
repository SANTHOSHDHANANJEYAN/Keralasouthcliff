'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, Users, Bed, Bath } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const villas = [
  {
    id: 1,
    name: 'Sea & Garden View Room',
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
    name: 'Landscape View Room',
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
    name: 'Exclusive Villa Stay',
    description:
      'Expansive villa with wide glass panels offering breathtaking coastal panoramas. Ideal for relaxation and gatherings.',
    features: ['Full Glass View', 'Private Garden', 'Infinity Pool Access', 'Luxury Interior', '2 Bedrooms', '2 Bathrooms'],
    images: ['/astega/5-min.jpg', '/astega/14-min.jpg', '/astega/19-min.jpg'],
    rating: 5.0,
    maxGuests: 4,
    slug: 'luxury-landscape',
    isLandscape: true,
  },
];

export default function VillasPreview() {
  const [currentIndexes, setCurrentIndexes] = useState<{ [key: number]: number }>({});

  // Auto-slide images
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
  }, []);

  return (
    <section className="bg-white pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold tracking-tight text-black mb-4">
            Asteya Beach Villas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A peaceful sanctuary set on Kerala’s sun-kissed coast. Choose your experience - ground, sky, or panoramic luxury.
          </p>
        </div>

        {/* Villas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {villas.filter((v) => !v.isLandscape).map((villa) => (
            <VillaCard key={villa.id} villa={villa} index={currentIndexes[villa.id] ?? 0} />
          ))}
        </div>

        {/* Landscape Villa */}
        {villas.filter((v) => v.isLandscape).map((villa) => (
          <VillaCard key={villa.id} villa={villa} index={currentIndexes[villa.id] ?? 0} landscape />
        ))}
      </div>

      {/* Progress Animation */}
      <style jsx>{`
        @keyframes progressFill {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .progress-bar {
          animation: progressFill 6s linear forwards;
        }
      `}</style>
    </section>
  );
}

function VillaCard({
  villa,
  index,
  landscape = false,
}: {
  villa: typeof villas[0];
  index: number;
  landscape?: boolean;
}) {
  const layoutClasses = landscape
    ? 'flex flex-col md:flex-row'
    : 'flex flex-col';

  return (
    <Card
      className={`overflow-hidden rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow ${landscape ? '' : 'cursor-pointer'}`}
      aria-label={`View details for ${villa.name}`}
    >
      <div className={`${landscape ? 'md:w-1/2' : 'w-full'} relative h-72 md:h-[500px] overflow-hidden`}>
        {villa.images.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              idx === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <Image
              src={img}
              alt={villa.name}
              fill
              className="object-cover"
              sizes={landscape ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 50vw, 100vw'}
              priority={idx === 0}
              decoding="async"
            />
          </div>
        ))}

        {/* Rating */}
        <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full border border-gray-300 flex items-center gap-1">
          <Star size={16} className="text-yellow-500" />
          <span className="text-sm font-medium">{villa.rating}</span>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30">
          <div className="h-full bg-white progress-bar" key={index} />
        </div>
      </div>

      <CardContent className={`${landscape ? 'md:w-1/2 p-8' : 'p-6'} flex flex-col justify-between`}>
        <div>
          <Link href={`/villas/${villa.slug}`} className="group">
            <h3 className={`font-bold text-black ${landscape ? 'text-3xl mb-3' : 'text-2xl mb-2'} group-hover:underline`}>
              {villa.name}
            </h3>
          </Link>

          <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
            <span className="flex items-center gap-1">
              <Users size={16} /> {villa.maxGuests} guests
            </span>
            <span className="flex items-center gap-1">
              <Bed size={16} /> {landscape ? '2 beds' : '1 bed'}
            </span>
            <span className="flex items-center gap-1">
              <Bath size={16} /> {landscape ? '2 baths' : '1 bath'}
            </span>
          </div>

          <p className="text-gray-600 mb-4">{villa.description}</p>
          <div className="flex flex-wrap gap-2">
            {villa.features.map((feature, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="rounded-full border-gray-400 text-gray-700"
              >
                {feature}
              </Badge>
            ))}
          </div>
        </div>
        <Button className="mt-6 bg-black text-white hover:bg-gray-800 rounded-full w-full md:w-auto px-6 py-2">
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
}
