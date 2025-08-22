'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

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
  { src: '/astega/PDF - Asteya-1-min.png', alt: 'Master Bedroom' },
];

const GallerySection = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [visibleImages, setVisibleImages] = useState(12);

  const loadMoreImages = useCallback(() => {
    setVisibleImages((prev) => Math.min(prev + 8, galleryData.length));
  }, []);

  // Infinite scroll lazy load
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && visibleImages < galleryData.length) {
            loadMoreImages();
          }
        });
      },
      { threshold: 0.2, rootMargin: '250px' }
    );

    const sentinel = document.querySelector('.load-more-sentinel');
    if (sentinel) observer.observe(sentinel);

    return () => observer.disconnect();
  }, [visibleImages, loadMoreImages]);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) =>
          prev !== null ? (prev + 1) % galleryData.length : prev
        );
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev !== null ? (prev - 1 + galleryData.length) % galleryData.length : prev
        );
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedIndex]);

  return (
    <section className="py-16 bg-white text-black">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our elegant cliffside villa interiors and exotic beachfront views.
          </p>
        </div>

        {/* Gallery Grid */}
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedIndex(index)}
                className="relative cursor-pointer overflow-hidden rounded-xl border border-black/10 bg-black/5 shadow-md hover:shadow-lg transition duration-300 group"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={300}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  priority={index < 6}
                  quality={85} // Increased quality to avoid pixelation
                  loading={index < 6 ? 'eager' : 'lazy'}
                  placeholder="blur"
                  blurDataURL="/placeholder.webp"
                  className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </motion.div>
            ))}
            {visibleImages < galleryData.length && (
              <div className="load-more-sentinel col-span-full h-10"></div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Load More Button */}
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

        {/* Fullscreen Image Modal */}
        <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
          <DialogContent className="max-w-5xl bg-transparent border-none shadow-none p-0 flex justify-center items-center">
            {selectedIndex !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-auto flex justify-center items-center"
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="absolute -top-12 right-0 bg-black/70 hover:bg-black p-2 rounded-full transition"
                >
                  <X size={34} className="text-white" />
                </button>

                {/* Prev button */}
                <button
                  onClick={() =>
                    setSelectedIndex((prev) =>
                      prev !== null ? (prev - 1 + galleryData.length) % galleryData.length : prev
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black p-2 rounded-full transition"
                >
                  <ChevronLeft size={40} className="text-white" />
                </button>

                {/* Next button */}
                <button
                  onClick={() =>
                    setSelectedIndex((prev) =>
                      prev !== null ? (prev + 1) % galleryData.length : prev
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black p-2 rounded-full transition"
                >
                  <ChevronRight size={40} className="text-white" />
                </button>

                {/* Large Image */}
                <Image
                  src={galleryData[selectedIndex].src}
                  alt={galleryData[selectedIndex].alt}
                  width={1200}
                  height={800}
                  quality={90}
                  loading="eager"
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
