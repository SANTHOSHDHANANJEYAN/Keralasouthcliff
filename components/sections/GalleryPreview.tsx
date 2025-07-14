'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

type CategoryKey = 'exterior' | 'interior' | 'rooms' | 'amenities';

const galleryData: Record<CategoryKey, { src: string; alt: string }[]> = {
  exterior: [
    { src: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg', alt: 'Beach View' },
    { src: 'https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg', alt: 'Sunset View' },
  ],
  interior: [
    { src: 'https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg', alt: 'Luxury Interior' },
  ],
  rooms: [
    { src: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg', alt: 'Bedroom' },
  ],
  amenities: [
    { src: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg', alt: 'Bathroom' },
  ],
};

const categories: (CategoryKey | 'all')[] = ['all', 'exterior', 'interior', 'rooms', 'amenities'];

const GallerySection = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | CategoryKey>('all');

  const allImages = Object.values(galleryData).flat();
  const currentImages =
    selectedCategory === 'all' ? allImages : galleryData[selectedCategory];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-800 text-lg px-4 py-2">
            Choose Your Category
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Our Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Select a category to view our curated collection of luxury visuals.
          </p>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentImages.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
