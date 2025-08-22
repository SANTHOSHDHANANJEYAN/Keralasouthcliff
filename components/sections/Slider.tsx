'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

type Slide = {
  id: number;
  image: string;
  leftText: string;
  mainTitle: string;
  subTitle?: string;
};

const sliderData: Slide[] = [
  {
    id: 1,
    image: '/Asteya -website/PDF - Asteya-1.png',
    leftText: 'ASTEYA',
    mainTitle: 'Sea & Garden View Room',
    subTitle: 'Enjoy a calming blend of lush garden surroundings with a glimpse of the sea',
  },
  {
    id: 2,
    image: '/Asteya -website/PDF - Asteya-2.png',
    leftText: 'ASTEYA',
    mainTitle: 'Landscape View Room',
    subTitle: 'Scenic landscape with partial sea and garden view – perfect for slow mornings.',
  },
  {
    id: 3,
    image: '/Asteya -website/Ateya - Living area (1).png',
    leftText: 'ASTEYA',
    mainTitle: 'Exclusive Villa Stay – Sea & Garden View',
    subTitle:
      'Book the entire villa for complete privacy, with serene sea and garden-facing rooms.',
  },
];

const Slider: React.FC = React.memo(() => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % sliderData.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = sliderData[currentSlide];

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <Image
            src={slide.image}
            alt={slide.mainTitle}
            fill
            className="object-cover brightness-[0.7] transition-transform duration-700"
            quality={90}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            priority={currentSlide === 0}
            placeholder="blur"
            blurDataURL="/placeholder.jpg"
          />
          <div className="absolute inset-0 bg-black/50 sm:bg-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="grid grid-cols-12 gap-4 w-full h-full px-4 sm:px-6 md:px-12 lg:px-24">
          {/* Left Vertical Text */}
          <div className="hidden sm:flex col-span-1 items-center justify-center -rotate-90 origin-center text-white text-xs md:text-lg font-bold tracking-widest uppercase">
            {slide.leftText}
          </div>

          {/* Center Title & Subtitle */}
          <div className="col-span-12 sm:col-span-10 md:col-span-8 flex flex-col justify-center items-center text-center space-y-6">
            <motion.h1
              key={slide.mainTitle}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-lg"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {slide.mainTitle}
            </motion.h1>

            {slide.subTitle && (
              <motion.p
                key={slide.subTitle}
                className="text-lg sm:text-2xl md:text-3xl text-gray-300 max-w-3xl"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {slide.subTitle}
              </motion.p>
            )}
          </div>

          {/* Desktop Dots */}
          <div className="hidden md:flex col-span-3 items-center justify-end relative">
            <div className="absolute bottom-6 right-6 flex space-x-3">
              {sliderData.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? 'bg-white scale-125'
                      : 'bg-gray-400 opacity-60'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex md:hidden space-x-3">
          {sliderData.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-white scale-110'
                  : 'bg-gray-400 opacity-50'
              }`}
              whileHover={{ scale: 1.1 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

Slider.displayName = 'Slider';

export default Slider;
