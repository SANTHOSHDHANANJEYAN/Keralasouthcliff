// app/villas/[id]/page.tsx
"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

// Your villa type
interface Villa {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
}

// Main component for the villa page
export default function VillaPage({ params }: { params: { id: string } }) {
  // Example: You might fetch villa data based on ID here.
  // For now I’ll mock it:
  const villa: Villa = {
    id: params.id,
    name: "Sample Villa",
    description: "A beautiful villa by the sea.",
    price: 12000000,
    images: [
      "https://placehold.co/800x600",
      "https://placehold.co/700x500",
      "https://placehold.co/900x700",
    ],
  };

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const showPrev = () => {
    if (selectedImage) {
      const index = villa.images.indexOf(selectedImage);
      if (index > 0) {
        setSelectedImage(villa.images[index - 1]);
      }
    }
  };

  const showNext = () => {
    if (selectedImage) {
      const index = villa.images.indexOf(selectedImage);
      if (index < villa.images.length - 1) {
        setSelectedImage(villa.images[index + 1]);
      }
    }
  };

  const currentIndex = selectedImage ? villa.images.indexOf(selectedImage) : -1;

  return (
    <>
      <Navbar />
      <main className="pt-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-black">{villa.name}</h1>
            <p className="mt-4 text-lg text-gray-700">{villa.description}</p>
            <p className="mt-2 text-2xl font-semibold text-green-600">
              ₹{villa.price.toLocaleString()}
            </p>
          </div>

          {/* Image grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {villa.images.map((image, idx) => (
              <div
                key={idx}
                className="cursor-pointer overflow-hidden rounded-lg shadow-md"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`Villa image ${idx + 1}`}
                  className="w-full h-64 object-cover transform hover:scale-105 transition"
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <button
            className="absolute top-6 right-6 text-white text-3xl"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>
          <button
            className="absolute left-6 text-white text-4xl"
            onClick={showPrev}
            disabled={currentIndex <= 0}
          >
            &#8592;
          </button>
          <img
            src={selectedImage}
            alt="Selected Villa"
            className="max-h-[80%] max-w-[80%] rounded-lg shadow-lg"
          />
          <button
            className="absolute right-6 text-white text-4xl"
            onClick={showNext}
            disabled={currentIndex >= villa.images.length - 1}
          >
            &#8594;
          </button>
        </div>
      )}
    </>
  );
}
