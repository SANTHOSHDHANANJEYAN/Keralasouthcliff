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
      {/* ✅ Preview Grid (only first 3 images) */}
      <div className="grid grid-cols-2 grid-rows-2 gap-4 mb-12 h-[600px]">
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

      {/* ✅ Lightbox (displays ALL images, not just first 3) */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X size={32} />
          </button>

          {/* Prev button */}
          <button
            onClick={showPrev}
            className="absolute left-4 text-white hover:text-gray-300"
          >
            <ChevronLeft size={48} />
          </button>

          {/* Main image */}
          <div className="relative w-[90%] max-w-5xl h-[80vh]">
            <Image
              src={images[lightboxIndex]}
              alt={`${name} full preview`}
              fill
              className="object-contain rounded-lg"
            />
          </div>

          {/* Next button */}
          <button
            onClick={showNext}
            className="absolute right-4 text-white hover:text-gray-300"
          >
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </>
  );
}
