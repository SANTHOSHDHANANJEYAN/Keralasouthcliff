'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Star, Users, Bed, Bath } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const VillasPreview = () => {
  const [currentIndexes, setCurrentIndexes] = useState<{ [key: number]: number }>({});

  const villas = useMemo(
    () => [
      {
        id: 1,
        name: 'Sea & Garden View Room (Ground Floor)',
        description:
          'Wake up to the sound of waves crashing against golden cliffs. Welcome to your modern, minimalist sanctuary on Varkala Cliff—where every day begins with breathtaking ocean views and adventure. Prime Cliffside Location – Uninterrupted sunset views, just 30 seconds from Café Sarwa and 5 minutes from sacred Papanasam Beach. Designed for Bliss – 550 sqft of Bohemian space with handcrafted Kerala furniture, luxury linens, and high-speed Wi-Fi for digital nomads. Ground Floor unit.',
        features: ['Garden Access', 'Direct Beach Access', 'Ocean View', 'Luxury Amenities', '1 Bedrooms', '1 Bathrooms'],
        images: ['/groundfloor/2.jpg', '/groundfloor/8.png', '/groundfloor/13.jpg'],
        rating: 4.9,
        maxGuests: 2,
        slug: 'sea-garden-room',
      },
      {
        id: 2,
        name: 'Landscape View Room (Top Floor)',
        description:
          'Embrace slow mornings with the soothing charm of our Landscape View Room. Offering a scenic blend of lush gardens and a partial sea view, this room is designed for peaceful stays. Bright, airy, and thoughtfully styled with modern comforts, it creates the perfect space to relax, recharge, and enjoy the beauty of Varkala’s natural surroundings.',
        features: ['Private Balcony', 'Panoramic Views', 'Sunset Views', '1 Bedrooms', '1 Bathrooms','Luxury Amenities'],
        images: ['/topfloor/6.jpg', '/topfloor/4.jpg', '/topfloor/5.jpg'],
        rating: 4.9,
        maxGuests: 2,
        slug: 'landscape-room',
      },
      {
        id: 3,
        name: 'Exclusive Villa Stay – Sea & Garden View',
        description:
          'Experience Asteya in complete privacy with our Exclusive Villa Stay. Perfect for families, friends, or long retreats, this option gives you the entire villa with spacious sea- and garden-facing rooms. Surrounded by lush greenery and glimpses of the Arabian Sea, the villa offers a serene setting where comfort meets nature. Enjoy personalized space, modern amenities, and the freedom to unwind at your own pace.',
        features: ['Full Glass View', 'Private Garden', 'Infinity Pool Access', 'Luxury Interior', '2 Bedrooms', '2 Bathrooms','Garden Access','Private Parking Access','2 Wheeler and 4 Wheeler Parking'],
        images: ['/homepage.png', '/groundfloor/2.jpg', '/topfloor/3.jpg'],
        rating: 5.0,
        maxGuests: 4,
        slug: 'luxury-landscape',
        isLandscape: true,
      },
    ],
    []
  );

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
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold tracking-tight text-black mb-4">Our Asteya's Luxury Villas - Asteya's Luxury Properties</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our luxurious properties, each with a unique view and premium amenities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {villas.slice(0, 2).map((villa) => {
            const currentIndex = currentIndexes[villa.id] ?? 0;
            return (
              <Link key={villa.id} href={`/villas/${villa.slug}`} passHref>
                <Card className="overflow-hidden rounded-2xl border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="relative h-72 overflow-hidden">
                    {villa.images.map((img, idx) => (
                      <div
                        key={idx}
                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                          idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                        }`}
                      >
                        <Image src={img} alt={villa.name} fill className="object-cover rounded-t-2xl" />
                      </div>
                    ))}
                    <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full border border-gray-300 flex items-center gap-1">
                      <Star size={16} className="text-yellow-500" />
                      <span className="text-sm font-medium">{villa.rating}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30">
                      <div className="h-full bg-white animate-progress" key={currentIndex} />
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
                    <Button className="mt-6 w-full bg-black text-white hover:bg-gray-800 rounded-full">
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {villas.filter((v) => v.isLandscape).map((villa) => {
          const currentIndex = currentIndexes[villa.id] ?? 0;
          return (
            <Link key={villa.id} href={`/villas/${villa.slug}`} passHref>
              <div className="overflow-hidden rounded-2xl border border-gray-200 flex flex-col md:flex-row cursor-pointer hover:shadow-lg transition-shadow">
                <div className="md:w-1/2 relative overflow-hidden h-72 md:h-[500px]">
                  {villa.images.map((img, idx) => (
                    <div
                      key={idx}
                      className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                        idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                      }`}
                    >
                      <Image src={img} alt={villa.name} fill className="object-cover rounded-l-2xl" />
                    </div>
                  ))}
                  <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full border border-gray-300 flex items-center gap-1">
                    <Star size={16} className="text-yellow-500" />
                    <span className="text-sm font-medium">{villa.rating}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30">
                    <div className="h-full bg-white animate-progress" key={currentIndex} />
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
                  <Button className="mt-8 bg-black text-white hover:bg-gray-800 rounded-full w-full md:w-auto px-6 py-2">
                    Book Now
                  </Button>
                </CardContent>
              </div>
            </Link>
          );
        })}
      </div>

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
