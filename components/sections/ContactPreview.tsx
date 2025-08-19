'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share2, Maximize2 } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type GalleryImage = {
  src: string;
  alt: string;
  title: string;
  category: string;
};

const images: GalleryImage[] = [
  { src: '/astega/1.jpg', alt: 'Beach View', title: 'Pristine Beach', category: 'Exterior' },
  { src: '/astega/2.jpg', alt: 'Luxury Interior', title: 'Elegant Living', category: 'Interior' },
  { src: '/astega/3.jpg', alt: 'Master Bedroom', title: 'Master Suite', category: 'Rooms' },
  { src: '/astega/4.jpg', alt: 'Bathroom', title: 'Luxury Bath', category: 'Amenities' },
  { src: '/astega/5.jpg', alt: 'Sunset View', title: 'Sunset Glory', category: 'Views' },
  { src: '/astega/6.jpg', alt: 'Terrace', title: 'Private Terrace', category: 'Outdoor' },
];

const categories = ['All', ...Array.from(new Set(images.map(img => img.category)))];

export default function FancyGallery() {
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const toggleLike = useCallback((index: number) => {
    setLiked(prev => {
      const updated = new Set(prev);
      updated.has(index) ? updated.delete(index) : updated.add(index);
      return updated;
    });
  }, []);

  const filtered = activeCategory === 'All' ? images : images.filter(img => img.category === activeCategory);

  return (
    <section className="pt-12 bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-2">Our Gallery</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">Explore our luxury villas with stunning visuals and immersive experiences.</p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {categories.map(cat => (
            <Button
              key={cat}
              size="sm"
              variant={activeCategory === cat ? 'default' : 'outline'}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((img, idx) => (
            <motion.div
              key={img.src}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="group relative overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition"
            >
              <div className="relative w-full h-64 sm:h-72 md:h-80">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                  loading={idx < 2 ? 'eager' : 'lazy'}
                  priority={idx < 2}
                />

                {/* Hover buttons */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button size="icon" variant="ghost" onClick={() => toggleLike(idx)} className="bg-white/80 p-2">
                    <Heart size={16} className={liked.has(idx) ? 'fill-black text-black' : ''} />
                  </Button>
                  <Button size="icon" variant="ghost" className="bg-white/80 p-2">
                    <Share2 size={16} />
                  </Button>
                </div>

                {/* Hover title */}
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <h3 className="text-black font-semibold text-base sm:text-lg mb-1 bg-white/80 px-2 py-1 rounded">{img.title}</h3>
                  <Badge className="bg-gray-100 text-black border border-black/10">{img.category}</Badge>
                </div>

                {/* View button */}
                <div
                  onClick={() => setSelected(img)}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <Button size="sm" className="bg-white/90 text-black border border-black/10">
                    <Maximize2 className="mr-2" size={16} /> View
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] p-0 bg-white rounded-xl overflow-hidden">
          {selected && (
            <div className="relative w-full h-[85vh]">
              <Image src={selected.src} alt={selected.alt} fill className="object-contain" sizes="90vw" />
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-6">
                <h3 className="text-black font-bold text-xl mb-1">{selected.title}</h3>
                <p className="text-gray-700">{selected.alt}</p>
                <Badge className="mt-2 bg-gray-100 text-black border border-black/10">{selected.category}</Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
