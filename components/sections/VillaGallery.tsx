'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function VillaGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  // ✅ Lightbox
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const showPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    }
  };

  const showNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % images.length);
    }
  };

  // ✅ Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'Escape') closeLightbox();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex]);

  // ✅ Load More state
  const [visibleCount, setVisibleCount] = useState(3);
  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, images.length));
  };

  const visibleImages = images.slice(0, visibleCount);

  return (
    <>
      {/* ✅ Responsive Preview Grid */}
      <div className="mb-12">
        {/* Mobile: stacked full-width */}
        <div className="grid grid-cols-1 gap-4 sm:hidden">
          {visibleImages.map((img, idx) => (
            <div
              key={idx}
              className="relative cursor-pointer"
              onClick={() => openLightbox(idx)}
            >
              <Image
                src={img}
                alt={`${name} preview ${idx + 1}`}
                width={800}
                height={600}
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>

        {/* Desktop: big + grid */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-4">
          {visibleImages.map((img, idx) => (
            <div
              key={idx}
              className={`relative cursor-pointer hover:opacity-80 transition ${
                idx === 0 && 'sm:col-span-2 sm:row-span-2 h-[600px]'
              }`}
              onClick={() => openLightbox(idx)}
              style={{
                height: idx === 0 ? '600px' : '290px',
              }}
            >
              <Image
                src={img}
                alt={`${name} preview ${idx + 1}`}
                fill
                className="rounded-lg object-cover"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>

        {/* ✅ Load More button */}
        {visibleCount < images.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
            >
              Load More Photos
            </button>
          </div>
        )}
      </div>

      {/* ✅ Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100]">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="fixed top-4 right-4 text-white hover:text-gray-300 z-[110] bg-black/60 rounded-full p-2"
          >
            <X size={28} />
          </button>

          {/* Prev button */}
          <button
            onClick={showPrev}
            className="absolute left-2 sm:left-4 text-white hover:text-gray-300 z-[110] bg-black/60 rounded-full p-2"
          >
            <ChevronLeft size={40} />
          </button>

          {/* Main image */}
          <div className="relative w-[90%] max-w-5xl h-[80vh] flex items-center justify-center z-[100]">
            <Image
              src={images[lightboxIndex]}
              alt={`${name} full preview`}
              width={1200}
              height={900}
              className="object-contain rounded-lg w-auto h-auto max-w-full max-h-full"
            />
          </div>

          {/* Next button */}
          <button
            onClick={showNext}
            className="absolute right-2 sm:right-4 text-white hover:text-gray-300 z-[110] bg-black/60 rounded-full p-2"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </>
  );
}
