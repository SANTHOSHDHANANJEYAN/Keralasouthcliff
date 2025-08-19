"use client";

import React from "react";
import Image from "next/image";

const images = [
  "/images/gallery1.jpg",
  "/images/gallery2.jpg",
  "/images/gallery3.jpg",
  "/images/gallery4.jpg",
  "/images/gallery5.jpg",
  "/images/gallery6.jpg",
];

export default function Gallery() {
  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Immerse yourself in the beauty of our villas through stunning visuals
          that capture the essence of luxury living by the Arabian Sea.
        </p>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((src, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <Image
              src={src}
              alt={`Gallery Image ${index + 1}`}
              width={600}
              height={400}
              className="w-full h-72 object-cover rounded-2xl"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
