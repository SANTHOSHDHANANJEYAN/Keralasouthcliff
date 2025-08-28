"use client";

import Image from "next/image";
import { useState } from "react";

export default function VillaGallery({ images, name }: { images: string[]; name: string }) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4 mb-12 h-[600px]">
      {/* Main Image */}
      <div className="relative col-span-1 row-span-2">
        <Image
          src={mainImage}
          alt={name}
          fill
          className="rounded-lg object-cover"
          priority
        />
      </div>

      {/* Preview Thumbnails */}
      {images.slice(1, 3).map((img, idx) => (
        <div
          key={idx}
          className="relative cursor-pointer hover:opacity-80 transition"
          onClick={() => setMainImage(img)}
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
  );
}
