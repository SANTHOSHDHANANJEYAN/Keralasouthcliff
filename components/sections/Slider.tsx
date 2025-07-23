'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

type Stat = {
  icon: string;
  count: string;
  text: string;
};

type Slide = {
  id: number;
  image: string;
  leftText: string;
  mainTitle: string;
  subTitle?: string;
  stats?: Stat[];
  orangeBarPresent?: boolean;
};

const sliderData: Slide[] = [
  {
    id: 1,
    image: '/Asteya -website/PDF - Asteya-1.png',
    leftText: 'LES PORT',
    mainTitle: 'BIKE PARK',
    stats: [
      { icon: '/icons/bike.svg', count: '19', text: 'Itinéraires dédiés' },
      { icon: '/icons/lift.svg', count: '10', text: 'Remontées mécaniques' },
      { icon: '/icons/ticket.svg', count: '1', text: 'Forfait' },
    ],
    orangeBarPresent: true,
  },
  {
    id: 2,
    image: '/Asteya -website/PDF - Asteya-2.png',
    leftText: 'PORTES DU SOLEIL',
    mainTitle: "L'AVENTURE",
    subTitle: 'AUTREMENT',
  },
];

const Slider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const slide = sliderData[currentSlide];

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
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
            className="object-cover"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="grid grid-cols-12 gap-4 w-full h-full px-4 sm:px-8 lg:px-24">
          {/* Left Vertical Label */}
          <div className="col-span-1 flex items-center justify-center -rotate-90 origin-center text-white text-xs md:text-lg font-bold tracking-widest uppercase">
            {slide.leftText}
          </div>

          {/* Center Content */}
          <div className="col-span-8 flex flex-col justify-center items-center text-center space-y-6">
            <motion.h1
              key={slide.mainTitle}
              className="text-4xl md:text-7xl font-extrabold text-white drop-shadow-md"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
            >
              {slide.mainTitle}
            </motion.h1>

            {slide.subTitle && (
              <motion.p
                key={slide.subTitle}
                className="text-3xl md:text-5xl font-bold text-[#627d6a] tracking-wide drop-shadow-lg"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {slide.subTitle}
              </motion.p>
            )}

            {/* Stats Section */}
            {slide.stats && (
              <motion.div
                className="absolute bottom-1/4 right-8 sm:right-24 p-6 bg-white/10 backdrop-blur-2xl rounded-xl text-white shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                {slide.stats.map((stat, index) => (
                  <div key={index} className="flex items-center mb-4 last:mb-0">
                    <div className="w-8 h-8 mr-4 flex items-center justify-center">
                      <Image src={stat.icon} alt="icon" width={32} height={32} />
                    </div>
                    <span className="text-2xl font-bold mr-2">{stat.count}</span>
                    <span className="text-base sm:text-lg">{stat.text}</span>
                  </div>
                ))}
                {slide.orangeBarPresent && (
                  <div className="mt-6 w-full h-2 bg-[#627d6a] rounded-full" />
                )}
              </motion.div>
            )}
          </div>

          {/* Right Controls */}
          <div className="col-span-3 flex flex-col items-end justify-center relative">
            {/* Pagination */}
            <div className="absolute bottom-8 right-6 flex space-x-3">
              {sliderData.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-[#627d6a] scale-125' : 'bg-white opacity-50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
