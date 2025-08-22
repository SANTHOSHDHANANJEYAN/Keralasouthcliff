'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { villas } from '@/lib/villas';
import { Button } from '@/components/ui/button';

const VillasSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">Our Asteya's Luxury Villas</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our luxurious villas, each with a unique view and premium amenities.
          </p>
        </div>

        {/* Villas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {villas.map((villa) => (
            <Link href={`/villas/${villa.id}`} key={villa.id} passHref>
              <div className="group block border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                {/* Villa Image */}
                <div className="relative h-64 w-full">
                  <Image
                    src={villa.images[0]}
                    alt={villa.name}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Villa Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-black mb-2">{villa.name}</h3>
                  <p className="text-gray-700 mb-4 flex-grow">
                    {villa.description.length > 120
                      ? villa.description.substring(0, 120) + '...'
                      : villa.description}
                  </p>
                  {/* View Details Button */}
                  <div className="flex justify-between items-center mt-auto">
                    <Button asChild variant="default" className="bg-black text-white hover:bg-gray-800">
                      <a>View Details</a>
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VillasSection;
