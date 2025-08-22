'use client';

import React, { useState, memo, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Heart, Share2, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const galleryImages = [
  { src: '/astega/31-min.jpg', alt: 'Beach View', category: 'Exterior', title: 'Pristine Beach Access' },
  { src: '/astega/1-min.jpg', alt: 'Luxury Interior', category: 'Interior', title: 'Elegant Living Space' },
  { src: '/astega/16-min.jpg', alt: 'Bedroom', category: 'Rooms', title: 'Master Bedroom Suite' },
  { src: '/astega/5-min.jpg', alt: 'Bathroom', category: 'Amenities', title: 'Luxury Bathroom' },
  { src: '/astega/4-min.jpg', alt: 'Sunset View', category: 'Views', title: 'Spectacular Sunset' },
  { src: '/astega/13-min.jpg', alt: 'Terrace', category: 'Outdoor', title: 'Private Terrace' },
];

type GalleryImage = {
  src: string;
  alt: string;
  category: string;
  title: string;
};

type GalleryItemProps = {
  image: GalleryImage;
  index: number;
  likedImages: Set<number>;
  toggleLike: (index: number) => void;
  onOpen: (index: number) => void;
};

const GalleryItem = memo(function GalleryItem({
  image,
  index,
  likedImages,
  toggleLike,
  onOpen,
}: GalleryItemProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="relative w-full h-64 sm:h-72 md:h-80">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={index < 6}
          quality={60}
          placeholder="empty"
          className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Hover Buttons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(index);
            }}
            className="bg-white/90 p-2 hover:bg-white"
          >
            <Heart
              size={16}
              className={likedImages.has(index) ? 'fill-red-500 text-red-500' : 'text-gray-700'}
            />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="bg-white/90 p-2 hover:bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <Share2 size={16} className="text-gray-700" />
          </Button>
        </div>

        {/* Hover Title */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <h3 className="text-black font-semibold text-base sm:text-lg mb-1 bg-white/95 px-3 py-2 rounded-lg">
            {image.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-700 bg-white/90 px-3 py-1 rounded-lg">
            {image.alt}
          </p>
        </div>

        {/* View Button */}
        <div
          onClick={() => onOpen(index)}
          className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-black/10"
        >
          <Button size="sm" className="bg-white/95 text-black border border-black/10 hover:bg-white shadow-lg">
            <Maximize2 className="mr-2" size={16} /> View Full Size
          </Button>
        </div>
      </div>
    </div>
  );
});
GalleryItem.displayName = 'GalleryItem';

export default function GalleryPreview() {
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Preload all images aggressively
  useEffect(() => {
    galleryImages.forEach((image) => {
      const img = new window.Image();
      img.src = image.src;
    });
  }, []);

  const toggleLike = useCallback((index: number) => {
    setLikedImages(prev => {
      const updated = new Set(prev);
      updated.has(index) ? updated.delete(index) : updated.add(index);
      return updated;
    });
  }, []);

  const handleNext = () => {
    if (openIndex === null) return;
    setOpenIndex((openIndex + 1) % galleryImages.length);
  };

  const handlePrev = () => {
    if (openIndex === null) return;
    setOpenIndex((openIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (openIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setOpenIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openIndex]);

  return (
    <section className="pt-8 bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Gallery</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-4xl mx-auto">
            Immerse yourself in the beauty of our villas through stunning visuals that capture the essence of luxury living by the Arabian Sea.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {galleryImages.map((img, idx) => (
            <GalleryItem
              key={idx}
              image={img}
              index={idx}
              likedImages={likedImages}
              toggleLike={toggleLike}
              onOpen={setOpenIndex}
            />
          ))}
        </div>

        {/* Dialog with Close and Navigation */}
        <Dialog open={openIndex !== null} onOpenChange={() => setOpenIndex(null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] p-0 bg-black rounded-xl overflow-hidden relative">
            {openIndex !== null && (
              <>
                {/* Close Button (outside top-right) */}
                <button
                  onClick={() => setOpenIndex(null)}
                  className="absolute -right-12 top-4 z-50 bg-black/70 border border-white/30 p-3 rounded-full shadow-xl hover:bg-black/90 transition"
                >
                  <X size={28} className="text-white" />
                </button>

                {/* Prev Button */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-black/70 border border-white/30 p-3 rounded-full shadow-xl hover:bg-black/90 transition"
                >
                  <ChevronLeft size={32} className="text-white" />
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-black/70 border border-white/30 p-3 rounded-full shadow-xl hover:bg-black/90 transition"
                >
                  <ChevronRight size={32} className="text-white" />
                </button>

                {/* Image */}
                <div className="relative w-full h-[85vh]">
                  <Image
                    src={galleryImages[openIndex].src}
                    alt={galleryImages[openIndex].alt}
                    fill
                    quality={80}
                    className="object-contain"
                    sizes="90vw"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-white/95 p-4 sm:p-6 border-t border-gray-200">
                    <h3 className="text-black font-bold text-lg sm:text-xl mb-1">
                      {galleryImages[openIndex].title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 mb-2">
                      {galleryImages[openIndex].alt}
                    </p>
                    <Badge className="bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200">
                      {galleryImages[openIndex].category}
                    </Badge>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
