'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const galleryData = [
  { src: '/astega/1-min.jpg', alt: 'Beach View' },
  { src: '/astega/2-min.jpg', alt: 'Sunset View' },
  { src: '/astega/5-min.jpg', alt: 'Terrace' },
  { src: '/astega/6-min.jpg', alt: 'Cliff View' },
  { src: '/astega/7-min.jpg', alt: 'Cliff View' },
  { src: '/astega/10-min.jpg', alt: 'Cliff View' },
  { src: '/astega/15-min.jpg', alt: 'Cliff View' },
  { src: '/astega/20-min.jpg', alt: 'Cliff View' },
  { src: '/astega/21-min.jpg', alt: 'Cliff View' },
  { src: '/astega/22-min.jpg', alt: 'Cliff View' },
  { src: '/astega/31-min.jpg', alt: 'Cliff View' },

  // Interior
  { src: '/astega/3-min.jpg', alt: 'Luxury Interior' },
  { src: '/astega/4-min.jpg', alt: 'Bedroom' },
  { src: '/astega/8-min.jpg', alt: 'Bathroom' },
  { src: '/astega/11-min.jpg', alt: 'Interior View' },
  { src: '/astega/12-min.jpg', alt: 'Modern Finish' },
  { src: '/astega/13-min.jpg', alt: 'Decor' },
  { src: '/astega/14-min.jpg', alt: 'Details' },
  { src: '/astega/16-min.jpg', alt: 'Living Room' },
  { src: '/astega/17-min.jpg', alt: 'Cozy Corner' },
  { src: '/astega/18-min.jpg', alt: 'Design' },
  { src: '/astega/19-min.jpg', alt: 'Hallway' },
  { src: '/astega/25-min.jpg', alt: 'Lounge' },
  { src: '/astega/26-min.jpg', alt: 'TV Area' },
  { src: '/astega/27-min.jpg', alt: 'Furniture' },
  { src: '/astega/28-min.jpg', alt: 'Lighting' },
  { src: '/astega/29-min.jpg', alt: 'Dining' },
  { src: '/astega/30-min.jpg', alt: 'Room Decor' },

  // Rooms
  { src: '/astega/PDF - Asteya-1-min.png', alt: 'Master Bedroom' },
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [visibleImages, setVisibleImages] = useState(12); // Load first 12 images initially

  // Load more images function
  const loadMoreImages = useCallback(() => {
    setVisibleImages(prev => Math.min(prev + 8, galleryData.length));
  }, []);

  // Intersection Observer for lazy loading more images
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && visibleImages < galleryData.length) {
            loadMoreImages();
          }
        });
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    const sentinel = document.querySelector('.load-more-sentinel');
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => observer.disconnect();
  }, [visibleImages, loadMoreImages]);

  return (
    <section className="py-16 bg-white text-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our elegant cliffside villa interiors and exotic beachfront views.
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {galleryData.slice(0, visibleImages).map((image, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedImage(image.src)}
                className="relative cursor-pointer overflow-hidden rounded-xl border border-black/10 bg-black/5 shadow-md hover:shadow-lg transition duration-300 group"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={300}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  priority={index < 6} // Prioritize first 6 images
                  quality={70} // Slightly reduced quality for faster loading
                  className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </motion.div>
            ))}

            {/* Load more sentinel */}
            {visibleImages < galleryData.length && (
              <div className="load-more-sentinel col-span-full h-10"></div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Manual load more button as fallback */}
        {visibleImages < galleryData.length && (
          <div className="text-center mt-8">
            <button
              onClick={loadMoreImages}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 font-medium"
            >
              Load More ({galleryData.length - visibleImages} remaining)
            </button>
          </div>
        )}

        {/* Image Preview Modal */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl bg-transparent border-none shadow-none p-0 flex justify-center items-center">
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-auto"
              >
                <Image
                  src={selectedImage}
                  alt="Preview"
                  width={1200}
                  height={800}
                  quality={85} // Better quality for modal
                  sizes="90vw"
                  className="rounded-lg object-contain max-h-[80vh] mx-auto"
                />
              </motion.div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default GallerySection;
