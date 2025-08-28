"use client";

import { getVillaById, villas } from '@/lib/villas';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import * as icons from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  Bed: icons.Bed,
  Bath: icons.Bath,
  Wifi: icons.Wifi,
  Car: icons.Car,
  Waves: icons.Waves,
  Mountain: icons.Mountain,
  Sun: icons.Sun,
  Shield: icons.Shield,
  Crown: icons.Crown,
};

export default function VillaPage({ params }: { params: { id: string } }) {
  const villa = getVillaById(params.id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!villa) {
    notFound();
  }

  // Get index for navigation
  const currentIndex = selectedImage ? villa.images.indexOf(selectedImage) : -1;

  const showPrev = () => {
    if (currentIndex > 0) {
      setSelectedImage(villa.images[currentIndex - 1]);
    }
  };

  const showNext = () => {
    if (currentIndex < villa.images.length - 1) {
      setSelectedImage(villa.images[currentIndex + 1]);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Villa Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-black">{villa.name}</h1>
            <p className="text-lg text-gray-600 mt-2">{villa.description}</p>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-2 grid-rows-2 gap-4 mb-12 h-[600px]">
            {villa.images.slice(0, 3).map((img, i) => (
              <div
                key={i}
                className={`relative ${i === 0 ? "col-span-1 row-span-2" : ""} cursor-pointer`}
                onClick={() => setSelectedImage(img)}
              >
                <Image
                  src={img}
                  alt={villa.name}
                  fill
                  className="rounded-lg object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Features & Amenities */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-black mb-4">Features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {villa.features.map(({ iconName, text }) => {
                  const Icon = iconMap[iconName];
                  return (
                    <div
                      key={text}
                      className="flex items-center gap-2 p-3 border rounded-md bg-white shadow-sm"
                    >
                      {Icon && <Icon className="text-black" size={20} />}
                      <span className="text-sm font-medium text-black">{text}</span>
                    </div>
                  );
                })}
              </div>

              <h2 className="text-2xl font-bold text-black mb-4">Amenities</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-gray-700">
                {villa.amenities.map((amenity) => (
                  <li key={amenity} className="flex items-center gap-3">
                    <icons.CheckCircle size={16} className="text-green-600" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Booking CTA */}
            <div className="border rounded-lg p-6 shadow-lg bg-white h-fit sticky top-24">
              <h2 className="text-2xl font-bold text-black mb-4">Book Your Stay</h2>
              <p className="text-gray-600 mb-4">
                Ready to experience {villa.name}? Secure your stay now and enjoy unmatched luxury.
              </p>
              <Link href="/contact" passHref>
                <Button className="w-full bg-black text-white hover:bg-gray-800">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Image Preview Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl bg-transparent border-none shadow-none p-0">
          {selectedImage && (
            <div className="relative">
              <Image
                src={selectedImage}
                alt="Preview"
                width={1000}
                height={700}
                className="rounded-lg object-contain max-h-[80vh] mx-auto"
              />
              {/* Close Button */}
              <button
                className="absolute top-2 right-2 bg-black/60 p-2 rounded-full"
                onClick={() => setSelectedImage(null)}
              >
                <X className="text-white" size={20} />
              </button>
              {/* Prev Button */}
              {currentIndex > 0 && (
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 p-2 rounded-full"
                  onClick={showPrev}
                >
                  <ChevronLeft className="text-white" size={24} />
                </button>
              )}
              {/* Next Button */}
              {currentIndex < villa.images.length - 1 && (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 p-2 rounded-full"
                  onClick={showNext}
                >
                  <ChevronRight className="text-white" size={24} />
                </button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
}

// Generate static pages foreach villa
export async function generateStaticParams() {
  return villas.map((villa) => ({
    id: villa.id,
  }));
}
