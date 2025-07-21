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
    <section className="relative h-screen overflow-hidden">
      {/* Background */}
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
            }}
          />
        ))}
        <div className="absolute inset-0 " />
      </div>

      {/* 3D Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <Suspense fallback={<div />}>
          <FloatingElements />
        </Suspense>
      </div>
      <div className="absolute bottom-0 left-0 w-full opacity-30">
        <Suspense fallback={<div />}>
          <InteractiveBeach />
        </Suspense>
      </div>

      {/* Content (Removed all text) */}
      <div className="relative z-10 flex items-center justify-center h-full">
        {/* Intentionally left empty */}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-[#627d6a]' : 'bg-[#627d6a]/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
