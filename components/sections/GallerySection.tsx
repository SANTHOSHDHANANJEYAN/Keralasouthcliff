'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const GallerySection = () => {
  const galleryData = useMemo(
    () => [
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
      { src: '/astega/11-min.jpg', alt: 'Interior View' },
      { src: '/astega/12-min.jpg', alt: 'Modern Finish' },
      { src: '/astega/13-min.jpg', alt: 'Decor' },
      { src: '/astega/14-min.jpg', alt: 'Details' },
      { src: '/astega/16-min.jpg', alt: 'Living Room' },
      { src: '/astega/18-min.jpg', alt: 'Design' },
      { src: '/astega/19-min.jpg', alt: 'Hallway' },
      { src: '/astega/25-min.jpg', alt: 'Lounge' },
      { src: '/astega/26-min.jpg', alt: 'TV Area' },
      { src: '/astega/27-min.jpg', alt: 'Furniture' },
      { src: '/astega/29-min.jpg', alt: 'Dining' },
      { src: '/astega/30-min.jpg', alt: 'Room Decor' },
      { src: '/astega/PDF - Asteya-1-min.png', alt: 'Master Bedroom' },
      { src: '/astega/3-min.jpg', alt: 'Luxury Interior' },
      { src: '/astega/4-min.jpg', alt: 'Bedroom' },
      { src: '/astega/8-min.jpg', alt: 'Bathroom' },
    ],
    []
  );

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [visibleImages, setVisibleImages] = useState(16); // Show 4 rows by default (4 columns × 4 rows)

  const loadMoreImages = () => {
    setVisibleImages((prev) => Math.min(prev + 4, galleryData.length));
  };

  return (
    <section className="py-16 bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Gallery</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our elegant cliffside villa interiors and exotic beachfront views.
          </p>
        </div>

        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {galleryData.slice(0, visibleImages).map((image, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedIndex(index)}
                className="relative cursor-pointer overflow-hidden rounded-lg sm:rounded-xl border border-black/10 bg-black/5 shadow-sm hover:shadow-lg transition duration-300 group"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={300}
                  sizes="(max-width: 640px) 100vw,
                         (max-width: 768px) 50vw,
                         (max-width: 1024px) 33vw,
                         25vw"
                  priority={index < 4}
                  quality={75}
                  loading={index < 4 ? 'eager' : 'lazy'}
                  placeholder="blur"
                  blurDataURL="/placeholder.webp"
                  className="w-full h-56 sm:h-60 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load More Button */}
        {visibleImages < galleryData.length && (
          <div className="text-center mt-8">
            <button
              onClick={loadMoreImages}
              className="px-5 sm:px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 text-sm sm:text-base font-medium"
            >
              Load More ({galleryData.length - visibleImages} remaining)
            </button>
          </div>
        )}

        {/* Fullscreen Image Modal */}
        <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
          <DialogContent
            className="max-w-full sm:max-w-4xl md:max-w-5xl bg-black/90 backdrop-blur-lg border-none shadow-none p-0 flex justify-center items-center rounded-xl [&>button]:hidden"
          >
            {selectedIndex !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full flex justify-center items-center"
              >
                {/* Custom Close Button */}
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black/70 hover:bg-black p-2 sm:p-3 rounded-full transition z-10"
                >
                  <X size={24} className="sm:w-7 sm:h-7 text-white" />
                </button>

                {/* Prev Button */}
                <button
                  onClick={() =>
                    setSelectedIndex((prev) =>
                      prev !== null ? (prev - 1 + galleryData.length) % galleryData.length : prev
                    )
                  }
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black p-2 sm:p-3 rounded-full transition z-10"
                >
                  <ChevronLeft size={28} className="sm:w-9 sm:h-9 text-white" />
                </button>

                {/* Next Button */}
                <button
                  onClick={() =>
                    setSelectedIndex((prev) =>
                      prev !== null ? (prev + 1) % galleryData.length : prev
                    )
                  }
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black p-2 sm:p-3 rounded-full transition z-10"
                >
                  <ChevronRight size={28} className="sm:w-9 sm:h-9 text-white" />
                </button>

                {/* Large Image */}
                <Image
                  src={galleryData[selectedIndex].src}
                  alt={galleryData[selectedIndex].alt}
                  width={1200}
                  height={800}
                  quality={85}
                  loading="eager"
                  sizes="100vw"
                  placeholder="blur"
                  blurDataURL="/placeholder.webp"
                  className="rounded-lg object-contain max-h-[70vh] sm:max-h-[80vh] w-auto mx-auto"
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
