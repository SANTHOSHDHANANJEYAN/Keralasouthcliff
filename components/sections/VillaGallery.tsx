"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function VillaGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

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
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "ArrowRight") showNext();
        if (e.key === "Escape") closeLightbox();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex]);

  return (
    <>
      {/* ✅ Responsive Preview Grid */}
      <div className="mb-12">
        {/* Mobile: stacked full-width */}
        <div className="grid grid-cols-1 gap-4 sm:hidden">
          {images.slice(0, 3).map((img, idx) => (
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

        {/* Desktop: 1 big left + 2 stacked right */}
        <div className="hidden sm:grid sm:grid-cols-2 sm:grid-rows-2 gap-4 h-[600px]">
          {/* Big left image */}
          <div
            className="relative col-span-1 row-span-2 cursor-pointer"
            onClick={() => openLightbox(0)}
          >
            <Image
              src={images[0]}
              alt={name}
              fill
              className="rounded-lg object-cover"
              priority
            />
          </div>

          {/* Two stacked images on right */}
          {images.slice(1, 3).map((img, idx) => (
            <div
              key={idx}
              className="relative cursor-pointer hover:opacity-80 transition"
              onClick={() => openLightbox(idx + 1)}
            >
              <Image
                src={img}
                alt={`${name} preview ${idx + 1}`}
                fill
                className="rounded-lg object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100]">
          {/* Close button - always visible */}
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
