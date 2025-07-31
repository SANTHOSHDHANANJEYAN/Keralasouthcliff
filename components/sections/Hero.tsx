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
    '/astega/7.jpg',
    '/astega/9.jpg',
    '/astega/14.jpg',
    '/astega/28.jpg',
    '/astega/29.jpg',
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
    <section className="relative min-h-[100dvh] overflow-hidden text-white">
      {/* Background Slides */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 bg-cover bg-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === index ? 1 : 0 }}
            transition={{ duration: 1.5 }}
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              backgroundImage: `url("${image}")`,
            }}
          />
        ))}
      </div>

      {/* 3D Elements */}
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



      {/* Slide Indicators */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border border-white transition-all duration-300 ${
              currentSlide === index ? 'bg-white' : 'bg-transparent'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
