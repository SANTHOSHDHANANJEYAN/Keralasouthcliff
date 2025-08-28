"use client";

import { getVillaById, villas } from '@/lib/villas';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import * as icons from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import React, { useState } from 'react';

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

  // ✅ Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const showPrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? villa.images.length - 1 : prev - 1));

  const showNext = () =>
    setCurrentIndex((prev) => (prev === villa.images.length - 1 ? 0 : prev + 1));

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
            {villa.images.slice(0, 3).map((img, index) => (
              <div
                key={img}
                className={`relative ${index === 0 ? "col-span-1 row-span-2" : ""}`}
                onClick={() => openModal(index)}
              >
                <Image
                  src={img}
                  alt={villa.name}
                  fill
                  className="rounded-lg object-cover cursor-pointer"
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
                      <span className="text-sm font-medium text-black">
                        {text}
                      </span>
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
              <h2 className="text-2xl font-bold text-black mb-4">
                Book Your Stay
              </h2>
              <p className="text-gray-600 mb-4">
                Ready to experience {villa.name}? Secure your stay now and enjoy
                unmatched luxury.
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

      {/* ✅ Fullscreen Image Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <button
            onClick={closeModal}
            className="absolute top-5 right-5 text-white text-3xl"
          >
            ✕
          </button>
          <button
            onClick={showPrev}
            className="absolute left-5 text-white text-4xl"
          >
            ‹
          </button>
          <div className="relative w-[90%] h-[80%]">
            <Image
              src={villa.images[currentIndex]}
              alt="Preview"
              fill
              className="object-contain rounded-lg"
            />
          </div>
          <button
            onClick={showNext}
            className="absolute right-5 text-white text-4xl"
          >
            ›
          </button>
        </div>
      )}

      <Footer />
    </>
  );
}

// ✅ Generate static pages for each villa
export async function generateStaticParams() {
  return villas.map((villa) => ({
    id: villa.id,
  }));
}
