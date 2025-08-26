"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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
      { src: '/astega/29-min.jpg', alt: 'Dining' },
      { src: '/astega/30-min.jpg', alt: 'Room Decor' },
      { src: '/astega/PDF - Asteya-1-min.png', alt: 'Master Bedroom' },
      { src: '/astega/3-min.jpg', alt: 'Luxury Interior' },
      { src: '/astega/4-min.jpg', alt: 'Bedroom' },
      { src: '/astega/8-min.jpg', alt: 'Bathroom' },
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(4); // 👈 start with 4 images

  const handlePrev = () => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + galleryData.length) % galleryData.length : null
    );
  };

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % galleryData.length : null
    );
  };

  return (
    <div className="container mx-auto p-4">
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryData.slice(0, visibleCount).map((item, index) => (
          <motion.div
            key={index}
            className="cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedIndex(index)}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={400}
              height={300}
              className="object-cover w-full h-60"
            />
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < galleryData.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 4)} // 👈 load next 4
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )}

      {/* Dialog for Image Preview */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <Dialog open={true} onOpenChange={() => setSelectedIndex(null)}>
            <DialogContent className="max-w-4xl p-0 bg-black/90 text-white">
              <div className="relative flex items-center justify-center">
                <button
                  className="absolute top-2 right-2 bg-white text-black rounded-full p-2"
                  onClick={() => setSelectedIndex(null)}
                >
                  <X size={20} />
                </button>
                <button
                  className="absolute left-2 bg-white text-black rounded-full p-2"
                  onClick={handlePrev}
                >
                  <ChevronLeft size={20} />
                </button>
                <Image
                  src={galleryData[selectedIndex].src}
                  alt={galleryData[selectedIndex].alt}
                  width={800}
                  height={600}
                  className="rounded-xl object-contain max-h-[80vh]"
                />
                <button
                  className="absolute right-2 bg-white text-black rounded-full p-2"
                  onClick={handleNext}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
