'use client';

import React, { useState, memo, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Heart, Share2, Maximize2 } from 'lucide-react';
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
  onOpen: (image: GalleryImage) => void;
  isLoaded: boolean;
  onImageLoad: () => void;
};

const GalleryItem = memo(function GalleryItem({
  image,
  index,
  likedImages,
  toggleLike,
  onOpen,
  isLoaded,
  onImageLoad,
}: GalleryItemProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative w-full h-64 sm:h-72 md:h-80">
        {/* Loading placeholder */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <Image
          src={image.src}
          alt={image.alt}
          width={800}
          height={600}
          priority={index < 3} // Prioritize first 3 images
          quality={index < 3 ? 85 : 75} // Higher quality for first 3 images
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          onLoad={onImageLoad}
          className={`w-full h-full object-cover rounded-xl transition-all duration-500 group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Hover Buttons - Only show when image is loaded */}
        {isLoaded && (
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              size="icon"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(index);
              }}
              className="bg-white/80 backdrop-blur-sm p-2 hover:bg-white/90"
            >
              <Heart
                size={16}
                className={likedImages.has(index) ? 'fill-red-500 text-red-500' : 'text-gray-700'}
              />
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className="bg-white/80 backdrop-blur-sm p-2 hover:bg-white/90"
              onClick={(e) => e.stopPropagation()}
            >
              <Share2 size={16} className="text-gray-700" />
            </Button>
          </div>
        )}

        {/* Hover Title - Only show when image is loaded */}
        {isLoaded && (
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <h3 className="text-black font-semibold text-base sm:text-lg mb-1 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg">
              {image.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-lg">
              {image.alt}
            </p>
          </div>
        )}

        {/* View Button - Only show when image is loaded */}
        {isLoaded && (
          <div
            onClick={() => onOpen(image)}
            className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20"
          >
            <Button size="sm" className="bg-white/95 backdrop-blur-sm text-black border border-black/10 hover:bg-white shadow-lg">
              <Maximize2 className="mr-2" size={16} /> View Full Size
            </Button>
          </div>
        )}

        {/* Loading overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-xs text-gray-500">Loading...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
GalleryItem.displayName = 'GalleryItem';

export default function GalleryPreview() {
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());
  const [openImage, setOpenImage] = useState<GalleryImage | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());

  // Preload first 3 images immediately
  useEffect(() => {
    const preloadFirst3 = galleryImages.slice(0, 3);
    preloadFirst3.forEach((image, index) => {
      const img = new window.Image();
      img.src = image.src;
      img.onload = () => {
        setPreloadedImages(prev => new Set(prev).add(image.src));
        setLoadedImages(prev => new Set(prev).add(index));
      };
    });

    // Preload remaining images with delay
    setTimeout(() => {
      const remainingImages = galleryImages.slice(3);
      remainingImages.forEach((image, index) => {
        const img = new window.Image();
        img.src = image.src;
        img.onload = () => {
          setPreloadedImages(prev => new Set(prev).add(image.src));
        };
      });
    }, 1000);
  }, []);

  const toggleLike = useCallback((index: number) => {
    setLikedImages(prev => {
      const updated = new Set(prev);
      updated.has(index) ? updated.delete(index) : updated.add(index);
      return updated;
    });
  }, []);

  const handleOpen = useCallback((image: GalleryImage) => {
    setOpenImage(image);
  }, []);

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages(prev => new Set(prev).add(index));
  }, []);

  return (
    <section className="pt-[2rem] bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Gallery</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-4xl mx-auto">
            Immerse yourself in the beauty of our villas through stunning visuals that capture the essence of luxury living by the Arabian Sea.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              style={{
                opacity: 0,
                animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s forwards`,
              }}
            >
              <GalleryItem
                image={img}
                index={idx}
                likedImages={likedImages}
                toggleLike={toggleLike}
                onOpen={handleOpen}
                isLoaded={loadedImages.has(idx)}
                onImageLoad={() => handleImageLoad(idx)}
              />
            </div>
          ))}
        </div>

        {/* Single Centralized Dialog */}
        <Dialog open={!!openImage} onOpenChange={() => setOpenImage(null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] p-0 bg-white rounded-xl overflow-hidden">
            {openImage && (
              <div className="relative w-full h-[85vh]">
                <Image
                  src={openImage.src}
                  alt={openImage.alt}
                  fill
                  quality={95} // High quality for modal view
                  className="object-contain"
                  sizes="90vw"
                  priority // Always prioritize modal images
                />
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 sm:p-6 border-t border-gray-200">
                  <h3 className="text-black font-bold text-lg sm:text-xl mb-1">
                    {openImage.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-2">{openImage.alt}</p>
                  <Badge className="bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200">
                    {openImage.category}
                  </Badge>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* CSS for fade-in animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
