'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Play, Star, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import FloatingElements from '@/components/3d/FloatingElements';
import InteractiveBeach from '@/components/3d/InteractiveBeach';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
    'https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg',
    'https://images.pexels.com/photos/1722183/pexels-photo-1722183.jpeg',
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
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

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight text-[#627d6a]">
              Embrace the Spirit of
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#627d6a] via-[#90a18d] to-[#b6c6b7]">
                Asteya
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-8">
              <MapPin className="w-5 h-5 text-[#627d6a]" />
              <span className="text-lg text-[#d3d8d1]">
                Wisdom Retreats, South Cliff, Kerala
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button
              size="lg"
              className="bg-[#627d6a] hover:bg-[#506654] text-white px-10 py-5 text-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Join Asteya Retreat
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex justify-center gap-8 mt-12"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-[#627d6a]">21</div>
              <div className="text-sm text-[#c3cec5]">Days of Mindful Living</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#627d6a]">5★</div>
              <div className="text-sm text-[#c3cec5]">Wisdom Rated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#627d6a]">100%</div>
              <div className="text-sm text-[#c3cec5]">Self-Awareness Practice</div>
            </div>
          </motion.div>
        </div>
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
