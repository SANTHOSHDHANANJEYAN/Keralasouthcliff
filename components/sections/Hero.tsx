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
    'https://images.pexels.com/photos/1722183/pexels-photo-1722183.jpeg'
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
    <section className="relative h-screen overflow-hidden ">
      {/* Background with parallax effect */}
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
      </div>
      
      {/* 3D Interactive Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <Suspense fallback={<div />}>
          <FloatingElements />
        </Suspense>
      </div>

      {/* Interactive Beach Animation */}
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

            
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              Kerala South Cliff
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400">
                Beach View Villas
              </span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p className="text-2xl md:text-3xl mb-8 text-gray-200 font-light">
              Experience Luxury Amidst Nature's Masterpiece
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-8">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span className="text-lg text-gray-300">South Cliff, Varkala, Kerala</span>
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
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-10 py-5 text-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              Book Now - $8,500/night
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-10 py-5 text-xl font-semibold transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            >
              <Play className="mr-2" size={20} />
              Virtual Tour
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
              <div className="text-3xl font-bold text-blue-400">2</div>
              <div className="text-sm text-gray-300">Luxury Villas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-400">5★</div>
              <div className="text-sm text-gray-300">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">24/7</div>
              <div className="text-sm text-gray-300">Concierge</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={32} />
        </motion.div>
        <div className="text-xs mt-2 text-center">Scroll to explore</div>
      </motion.div>

      {/* Slide indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;