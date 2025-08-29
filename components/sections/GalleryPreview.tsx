'use client';

import React, { useState, memo, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Heart, Share2, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const galleryImages = [
  { src: '/astega/31-min.jpg', alt: 'Villa view with private pool' },
  { src: '/astega/1-min.jpg', alt: 'Beach view near the villas' },
  { src: '/astega/16-min.jpg', alt: 'Luxury villa bedroom' },
  { src: '/astega/5-min.jpg', alt: 'Infinity pool view' },
  { src: '/astega/11-min.jpg', alt: 'Sunset over the villas' },
  { src: '/astega/13-min.jpg', alt: 'Modern villa interiors' },
];

type GalleryImage = {
  src: string;
  alt: string;
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
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative w-full h-64 sm:h-72 md:h-80">
        <Image
          src={image.src}
          alt={image.alt}
          width={800}
          height={600}
          quality={90}
          placeholder="blur"
          blurDataURL="/blur-placeholder.webp"
          className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
          loading={index <= 1 ? 'eager' : 'lazy'}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Hover Buttons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(index);
            }}
            aria-label={likedImages.has(index) ? 'Unlike image' : 'Like image'}
            className="bg-white/80 p-2 rounded-full hover:scale-105 transition-transform"
          >
            <Heart size={16} className={likedImages.has(index) ? 'fill-black text-black' : ''} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Share image"
            className="bg-white/80 p-2 rounded-full hover:scale-105 transition-transform"
          >
            <Share2 size={16} />
          </Button>
        </div>

        {/* View Button */}
        <div
          onClick={() => onOpen(index)}
          className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <Button
            size="sm"
            aria-label="View image"
            className="bg-white/90 text-black border border-black/10 hover:scale-105 transition-transform"
          >
            <Maximize2 className="mr-2" size={16} /> View
          </Button>
        </div>
      </div>
    </div>
  );
});
GalleryItem.displayName = 'GalleryItem';

export default function GalleryPreview() {
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const toggleLike = useCallback((index: number) => {
    setLikedImages((prev) => {
      const updated = new Set(prev);
      updated.has(index) ? updated.delete(index) : updated.add(index);
      return updated;
    });
  }, []);

  const onOpen = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const onClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const nextImage = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % galleryImages.length : null
    );
  }, []);

  const prevImage = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null
    );
  }, []);

  // Keyboard navigation for accessibility
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex !== null) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedIndex, nextImage, prevImage, onClose]);

  return (
    <section className="pt-[2rem] bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Gallery</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-4xl mx-auto">
            Immerse yourself in the beauty of our villas through stunning visuals
            that capture the essence of luxury living by the Arabian Sea.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {galleryImages.map((img, idx) => (
            <GalleryItem
              key={idx}
              image={img}
              index={idx}
              likedImages={likedImages}
              toggleLike={toggleLike}
              onOpen={onOpen}
            />
          ))}
        </div>

        {/* Image Dialog */}
        <Dialog open={selectedIndex !== null} onOpenChange={onClose}>
          <DialogContent className="max-w-6xl max-h-[90vh] p-0 bg-black/90 backdrop-blur-lg border-none shadow-none flex justify-center items-center rounded-xl">
            {selectedIndex !== null && (
              <div className="relative w-full flex justify-center items-center">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/20 hover:bg-white/30 p-2 sm:p-3 rounded-full transition z-10"
                >
                  <X size={24} className="sm:w-7 sm:h-7 text-white" />
                </button>

                {/* Prev Button */}
                <button
                  onClick={prevImage}
                  aria-label="Previous image"
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 sm:p-3 rounded-full transition z-10"
                >
                  <ChevronLeft size={28} className="sm:w-9 sm:h-9 text-white" />
                </button>

                {/* Next Button */}
                <button
                  onClick={nextImage}
                  aria-label="Next image"
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 sm:p-3 rounded-full transition z-10"
                >
                  <ChevronRight size={28} className="sm:w-9 sm:h-9 text-white" />
                </button>

                {/* Large Image */}
                <div className="w-full h-[80vh] relative">
                  <Image
                    src={galleryImages[selectedIndex].src}
                    alt={galleryImages[selectedIndex].alt}
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
    </section>
  );
}
