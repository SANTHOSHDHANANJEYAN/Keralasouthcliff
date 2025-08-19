'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageGroup {
  images: string[];
  position: 'left' | 'center' | 'right';
  rotation: number;
  zIndex: number;
}

const imageGroups: ImageGroup[] = [
  { images: ['/astega/1.jpg', '/astega/2.jpg'], position: 'left', rotation: -8, zIndex: 20 },
  { images: ['/astega/3.jpg', '/astega/4.jpg'], position: 'center', rotation: 5, zIndex: 30 },
  { images: ['/astega/5.jpg', '/astega/6.jpg'], position: 'right', rotation: 12, zIndex: 20 },
];

const floatingWords = ['EXCLUSIVE', 'LUXURY', 'ESCAPE'];

const ActivitiesSection: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imageGroups[0].images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const sizes = {
    left: 'w-[180px] sm:w-[220px] md:w-[280px] lg:w-[360px] h-[260px] sm:h-[300px] md:h-[380px] lg:h-[480px]',
    center: 'w-[200px] sm:w-[240px] md:w-[320px] lg:w-[400px] h-[280px] sm:h-[320px] md:h-[400px] lg:h-[500px]',
    right: 'w-[180px] sm:w-[220px] md:w-[280px] lg:w-[360px] h-[260px] sm:h-[300px] md:h-[380px] lg:h-[480px]',
  };

  return (
    <section className="relative w-full h-[700px] sm:h-[800px] md:h-[950px] lg:h-[1100px] flex items-center justify-center overflow-hidden bg-black">
      
      {/* Floating Words */}
      {floatingWords.map((word, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.5, duration: 1 }}
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 z-0 transform ${
            i === 0 ? '-translate-y-[160%] -rotate-6' : i === 1 ? '-translate-y-1/2 rotate-3' : '-translate-y-[10%] -rotate-1'
          }`}
        >
          <svg
            className="w-[500px] h-[120px] sm:w-[600px] sm:h-[150px] md:w-[800px] md:h-[200px] lg:w-[1000px] lg:h-[250px]"
            viewBox="0 0 1000 300"
          >
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              style={{
                fontSize: '180px',
                fill: 'none',
                stroke: 'rgba(255,255,255,0.06)',
                strokeWidth: 2,
                fontFamily: 'system-ui, sans-serif',
                letterSpacing: '0.05em',
              }}
            >
              {word}
            </text>
          </svg>
        </motion.div>
      ))}

      {/* Image Layers */}
      {imageGroups.map((group, i) => {
        const posClass =
          group.position === 'left'
            ? 'left-[2%] sm:left-[6%]'
            : group.position === 'center'
            ? 'left-1/2 -translate-x-1/2'
            : 'right-[2%] sm:right-[6%]';

        return (
          <div
            key={i}
            className={`absolute top-[40%] sm:top-[35%] md:top-[30%] ${posClass} z-[${group.zIndex}] transform rotate-[${group.rotation}deg]`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${i}-${index}`}
                initial={{ opacity: 0, scale: 0.95, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -50 }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                className={`relative rounded-3xl overflow-hidden shadow-2xl ${sizes[group.position]}`}
              >
                <Image
                  src={group.images[index]}
                  alt={`Activity Image ${i}`}
                  fill
                  className="object-cover rounded-3xl filter grayscale transition-transform duration-700 ease-in-out hover:scale-105 hover:brightness-110"
                  sizes="(max-width: 640px) 180px, (max-width: 768px) 240px, (max-width: 1024px) 320px, 360px"
                  quality={75}
                  priority={i === 1 && index === 0}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        );
      })}
    </section>
  );
};

export default ActivitiesSection;
