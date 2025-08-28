'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogClose,
} from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  description: string;
}

export function ImageGallery({ images, description }: ImageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div>
      {/* Image Grid */}
      <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[600px]">
        <div className="relative col-span-1 row-span-2 cursor-pointer" onClick={() => openModal(0)}>
          <Image
            src={images[0]}
            alt="Villa image 1"
            fill
            className="rounded-lg object-cover"
            priority
          />
        </div>
        <div className="relative cursor-pointer" onClick={() => openModal(1)}>
          <Image
            src={images[1]}
            alt="Villa image 2"
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative cursor-pointer" onClick={() => openModal(2)}>
          <Image
            src={images[2]}
            alt="Villa image 3"
            fill
            className="rounded-lg object-cover"
          />
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0 border-0 bg-transparent">
            <div className="relative">
                <Image
                    src={images[currentIndex]}
                    alt={`Image ${currentIndex + 1}`}
                    width={1200}
                    height={800}
                    className="rounded-lg object-contain"
                />

                <button
                    onClick={goToPrevious}
                    className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
                    aria-label="Previous image"
                >
                    <ChevronLeft size={24} />
                </button>

                <button
                    onClick={goToNext}
                    className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
                    aria-label="Next image"
                >
                    <ChevronRight size={24} />
                </button>

                <DialogClose asChild>
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
                        aria-label="Close"
                    >
                        <X size={24} />
                    </button>
                </DialogClose>
            </div>
            <div className="bg-white p-4 rounded-b-lg">
                <p className="text-gray-700">{description}</p>
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
