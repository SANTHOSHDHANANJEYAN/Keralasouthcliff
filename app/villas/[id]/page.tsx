'use client'; // Added to enable client-side interactions for the modal

import { useState } from 'react';
import { getVillaById, villas } from '@/lib/villas';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import * as icons from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog'; // Added for modal
import { X, ChevronLeft, ChevronRight } from 'lucide-react'; // Added icons for modal controls
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

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

  if (!villa) {
    notFound();
  }

  // State for image preview modal
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const nextImage = () => {
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % villa.images.length : null));
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + villa.images.length) % villa.images.length : null));
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
            <div
              className="relative col-span-1 row-span-2 cursor-pointer"
              onClick={() => openModal(0)}
            >
              <Image
                src={villa.images[0]}
                alt={villa.name}
                fill
                className="rounded-lg object-cover transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>
            <div
              className="relative cursor-pointer"
              onClick={() => openModal(1)}
            >
              <Image
                src={villa.images[1]}
                alt={villa.name}
                fill
                className="rounded-lg object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div
              className="relative cursor-pointer"
              onClick={() => openModal(2)}
            >
              <Image
                src={villa.images[2]}
                alt={villa.name}
                fill
                className="rounded-lg object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
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

          {/* Image Preview Modal */}
          <Dialog open={selectedIndex !== null} onOpenChange={closeModal}>
            <DialogContent className="max-w-6xl max-h-[90vh] p-0 bg-black/90 backdrop-blur-lg border-none shadow-none flex justify-center items-center rounded-xl">
              {selectedIndex !== null && (
                <div className="relative w-full flex justify-center items-center">
                  {/* Close Button */}
                  <button
                    onClick={closeModal}
                    className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/20 hover:bg-white/30 p-2 sm:p-3 rounded-full transition z-10"
                  >
                    <X size={24} className="sm:w-7 sm:h-7 text-white" />
                  </button>

                  {/* Prev Button */}
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 sm:p-3 rounded-full transition z-10"
                  >
                    <ChevronLeft size={28} className="sm:w-9 sm:h-9 text-white" />
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 sm:p-3 rounded-full transition z-10"
                  >
                    <ChevronRight size={28} className="sm:w-9 sm:h-9 text-white" />
                  </button>

                  {/* Large Image */}
                  <div className="w-full h-[80vh] relative">
                    <Image
                      src={villa.images[selectedIndex]}
                      alt={villa.name}
                      fill
                      quality={95}
                      priority
                      className="object-contain"
                      sizes="100vw"
                      placeholder="blur"
                      blurDataURL="/blur-placeholder.webp"
                    />
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Generate static pages for each villa
export async function generateStaticParams() {
  return villas.map((villa) => ({
    id: villa.id,
  }));
}
