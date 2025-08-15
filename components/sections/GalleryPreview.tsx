'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { Play, Maximize2, Heart, Share2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const galleryImages = [
  {
    src: '/Asteya -website/Thank You 900k followers (Flyer) (3).png',
    alt: 'Beach View',
    category: 'Exterior',
    title: 'Pristine Beach Access',
  },
  {
    src: '/Asteya -website/Thank You 900k followers (Flyer) (4).png',
    alt: 'Luxury Interior',
    category: 'Interior',
    title: 'Elegant Living Space',
  },
  {
    src: '/astega/9.jpg',
    alt: 'Bedroom',
    category: 'Rooms',
    title: 'Master Bedroom Suite',
  },
  {
    src: '/Asteya -website/Thank You 900k followers (Flyer) (5).png',
    alt: 'Bathroom',
    category: 'Amenities',
    title: 'Luxury Bathroom',
  },
  {
    src: '/Asteya -website/Thank You 900k followers (Flyer) (1).png',
    alt: 'Sunset View',
    category: 'Views',
    title: 'Spectacular Sunset',
  },
  {
    src: '/astega/13.jpg',
    alt: 'Terrace',
    category: 'Outdoor',
    title: 'Private Terrace',
  },
];

export default function GalleryPreview() {
  const [likedImages, setLikedImages] = useState(new Set<number>());
  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

  const toggleLike = (index: number) => {
    const updatedLikes = new Set(likedImages);
    updatedLikes.has(index) ? updatedLikes.delete(index) : updatedLikes.add(index);
    setLikedImages(updatedLikes);
  };

  return (
    <section className="py-20 sm:py-24 bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Gallery </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-4xl mx-auto">
            Immerse yourself in the beauty of our villas through stunning visuals that capture the essence of luxury living by the Arabian Sea.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="relative w-full h-64 sm:h-72 md:h-80">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Top Buttons */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => toggleLike(index)}
                    className="bg-white/80 text-black hover:bg-gray-200 p-2"
                    aria-label="Like image"
                  >
                    <Heart
                      size={16}
                      className={likedImages.has(index) ? 'fill-black text-black' : ''}
                    />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-white/80 text-black hover:bg-gray-200 p-2"
                    aria-label="Share image"
                  >
                    <Share2 size={16} />
                  </Button>
                </div>

                {/* Image Title */}
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <h3 className="text-black font-semibold text-base sm:text-lg mb-1 bg-white/80 px-2 py-1 rounded">
                    {image.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 bg-white/70 px-2 py-1 rounded">
                    {image.alt}
                  </p>
                </div>

                {/* Dialog Image View */}
                <Dialog>
                  <DialogTrigger asChild>
                    <div
                      onClick={() => setSelectedImage(image)}
                      className="absolute inset-0 cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <Button
                        size="sm"
                        className="bg-white/90 text-black hover:bg-gray-100 border border-black/10"
                      >
                        <Maximize2 className="mr-2" size={16} />
                        View
                      </Button>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl max-h-[90vh] p-0 bg-white rounded-xl overflow-hidden">
                    <div className="relative w-full h-[85vh]">
                      <Image
                        src={selectedImage.src}
                        alt={selectedImage.alt}
                        fill
                        className="object-contain"
                        sizes="90vw"
                        priority
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-4 sm:p-6">
                        <h3 className="text-black font-bold text-lg sm:text-xl mb-1">{selectedImage.title}</h3>
                        <p className="text-sm sm:text-base text-gray-700">{selectedImage.alt}</p>
                        <Badge className="mt-2 bg-gray-100 text-black border border-black/10">
                          {selectedImage.category}
                        </Badge>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>

       

      </div>
    </section>
  );
}
