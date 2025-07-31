'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import FloatingElements from '@/components/3d/FloatingElements';
import InteractiveBeach from '@/components/3d/InteractiveBeach';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  const backgroundImage = '/Asteya -website/PDF - Asteya-1.png';

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden text-white">
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Overlay tint for better contrast */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* 3D elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none z-10">
        <Suspense fallback={null}>
          <FloatingElements />
        </Suspense>
      </div>
      <div className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none z-10">
        <Suspense fallback={null}>
          <InteractiveBeach />
        </Suspense>
      </div>

      {/* Text Content */}

    </section>
  );
};

export default Hero;
