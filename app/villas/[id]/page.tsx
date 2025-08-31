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

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    );
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : null
    );
  };

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev(e as any);
      if (e.key === "ArrowRight") showNext(e as any);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length]);

  return (
    <div className="w-full">
      {/* Grid Gallery */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-0">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative w-full h-48 sm:h-64 md:h-72 lg:h-80 cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={src}
              alt={`${name} - ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            className="absolute top-5 right-5 text-white text-3xl"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
          >
            <X size={32} />
          </button>

          {/* Left Arrow */}
          <button
            className="absolute left-3 sm:left-6 text-white p-2 bg-black bg-opacity-50 rounded-full"
            onClick={showPrev}
          >
            <ChevronLeft size={36} />
          </button>

          {/* Image */}
          <div className="relative w-[90%] max-w-4xl h-[70vh]">
            <Image
              src={images[lightboxIndex]}
              alt={`${name} - ${lightboxIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>

          {/* Right Arrow */}
          <button
            className="absolute right-3 sm:right-6 text-white p-2 bg-black bg-opacity-50 rounded-full"
            onClick={showNext}
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </div>
  );
}
