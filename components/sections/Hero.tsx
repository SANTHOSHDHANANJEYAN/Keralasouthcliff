'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import FloatingElements from '@/components/3d/FloatingElements';
import InteractiveBeach from '@/components/3d/InteractiveBeach';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    '/Asteya -website/PDF - Asteya-1.png',
    '/Asteya -website/PDF - Asteya-2.png',
    '/Asteya -website/PDF - Asteya-4.png',
    '/Asteya -website/PDF - Asteya-7.png',
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-black text-white">
      {/* Background Slides with Grayscale */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === index ? 1 : 0 }}
            transition={{ duration: 1.5 }}
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              backgroundImage: `url("${image}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'grayscale(100%) brightness(0.7)',
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      </div>

      {/* 3D Elements in Faded White Tone */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <Suspense fallback={<div />}>
          <FloatingElements />
        </Suspense>
      </div>
      <div className="absolute bottom-0 left-0 w-full opacity-15">
        <Suspense fallback={<div />}>
          <InteractiveBeach />
        </Suspense>
      </div>

      {/* Hero Content (Can add text here later) */}
      <div className="relative z-10 flex items-center justify-center h-full">
        {/* Add any content if needed */}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full border border-white transition-all duration-300 ${
              currentSlide === index ? 'bg-white' : 'bg-transparent'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
