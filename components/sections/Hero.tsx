'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingElements from '@/components/3d/FloatingElements';
import InteractiveBeach from '@/components/3d/InteractiveBeach';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    backgroundImage: '/astega/5.jpg',
    headline: 'ASTEYA',
    subheadline: 'LUXURY. MINDFULNESS. NATURE.',
  },
  {
    backgroundImage: '/astega/9.jpg',
    headline: 'GROUND FLOOR VILLA',
    subheadline: 'PRIVATE AND PEACEFUL',
  },
  {
    backgroundImage: '/astega/14.jpg',
    headline: 'TOP FLOOR VILLA',
    subheadline: 'ELEVATED COMFORT',
  },
];

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [current, setCurrent] = useState(0);

  // Auto slide change every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden text-white">
      {/* Preload images to prevent flash on change */}
      <div style={{ display: 'none' }}>
        {slides.map((slide, index) => (
          <Image
            key={`preload-${index}`}
            src={slide.backgroundImage}
            alt=""
            width={1920}
            height={1080}
            priority={index < 2} // Eagerly load the first two images
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          <Image
            src={slides[current].backgroundImage}
            alt={slides[current].headline}
            layout="fill"
            objectFit="cover"
            priority
            className="transform-gpu"
            style={{
              transform: `translateY(${scrollY * 0.2}px) scale(1.05)`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* 3D Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none z-20">
        <Suspense fallback={null}>
          <FloatingElements />
        </Suspense>
      </div>
      <div className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none z-20">
        <Suspense fallback={null}>
          <InteractiveBeach />
        </Suspense>
      </div>

      {/* Slide Content */}
      <div className="relative z-30 flex flex-col items-center justify-center h-screen text-center px-4">
        <motion.h1
          key={`${slides[current].headline}-h1`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-4 text-white/95"
        >
          {slides[current].headline}
        </motion.h1>
        <motion.p
          key={`${slides[current].subheadline}-p`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-2xl font-medium text-white/95"
        >
          {slides[current].subheadline}
        </motion.p>
      </div>

      {/* Arrows */}
      <div className="absolute bottom-10 z-40 left-0 right-0 flex justify-center gap-6">
        <button
          onClick={prevSlide}
          className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
