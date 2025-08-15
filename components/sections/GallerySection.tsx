'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon, Home, Sofa, BedDouble } from 'lucide-react';

type Category = 'all' | 'exterior' | 'interior' | 'rooms';

const galleryData: Record<Exclude<Category, 'all'>, { src: string; alt: string }[]> = {
  exterior: [
    { src: '/astega/1.jpg', alt: 'Beach View' },
    { src: '/astega/2.jpg', alt: 'Sunset View' },
    { src: '/astega/5.jpg', alt: 'Terrace' },
    { src: '/astega/6.jpg', alt: 'Cliff View' },
    { src: '/astega/7.jpg', alt: 'Cliff View' },
    { src: '/astega/10.jpg', alt: 'Cliff View' },
    { src: '/astega/15.jpg', alt: 'Cliff View' },
    { src: '/astega/20.jpg', alt: 'Cliff View' },
    { src: '/astega/21.jpg', alt: 'Cliff View' },
    { src: '/astega/22.jpg', alt: 'Cliff View' },
    { src: '/astega/31.jpg', alt: 'Cliff View' },
  ],
  interior: [
    { src: '/astega/3.jpg', alt: 'Luxury Interior' },
    { src: '/astega/4.jpg', alt: 'Bedroom' },
    { src: '/astega/8.jpg', alt: 'Bathroom' },
    { src: '/astega/9.jpg', alt: 'Living Area' },
    { src: '/astega/11.jpg', alt: 'Interior View' },
    { src: '/astega/12.jpg', alt: 'Modern Finish' },
    { src: '/astega/13.jpg', alt: 'Decor' },
    { src: '/astega/14.jpg', alt: 'Details' },
    { src: '/astega/16.jpg', alt: 'Living Room' },
    { src: '/astega/17.jpg', alt: 'Cozy Corner' },
    { src: '/astega/18.jpg', alt: 'Design' },
    { src: '/astega/19.jpg', alt: 'Hallway' },
    { src: '/astega/25.jpg', alt: 'Lounge' },
    { src: '/astega/26.jpg', alt: 'TV Area' },
    { src: '/astega/27.jpg', alt: 'Furniture' },
    { src: '/astega/28.jpg', alt: 'Lighting' },
    { src: '/astega/29.jpg', alt: 'Dining' },
    { src: '/astega/30.jpg', alt: 'Room Decor' },
    { src: '/astega/32.jpg', alt: 'Balcony' },
  ],
  rooms: [
    { src: '/Asteya -website/PDF - Asteya-2.png', alt: 'Master Bedroom' },
  ],
};

const iconMap: Record<Category, JSX.Element> = {
  all: <ImageIcon className="w-4 h-4 mr-1" />,
  exterior: <Home className="w-4 h-4 mr-1" />,
  interior: <Sofa className="w-4 h-4 mr-1" />,
  rooms: <BedDouble className="w-4 h-4 mr-1" />,
};

const GallerySection = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const allImages = Object.values(galleryData).flat();
  const currentImages = selectedCategory === 'all' ? allImages : galleryData[selectedCategory];

  return (
    <section className="py-20 bg-white text-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our elegant cliffside villa interiors and exotic beachfront views.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap justify-center mb-8">
          {(['all', 'exterior', 'interior', 'rooms'] as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium border transition ${
                selectedCategory === cat
                  ? 'bg-black text-white'
                  : 'bg-transparent text-black border-black/30 hover:bg-black hover:text-white'
              }`}
            >
              {iconMap[cat]}
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {currentImages.map((image, index) => (
              <div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-xl border border-black/10 bg-black/5 shadow-md hover:shadow-lg transition duration-300"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={300}
                  loading="lazy"
                  className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-3 left-3">
                  <span className="bg-black text-white px-2 py-1 text-xs rounded shadow">
                    {image.alt}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GallerySection;
