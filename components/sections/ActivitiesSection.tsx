'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const leftImages = [
  '/Asteya -website/Asteya - beach villa  (1).png',
  '/Asteya -website/Asteya - beach villa  (4).png',
];
const middleImages = [
  '/Asteya -website/Asteya - beach villa  (2).png',
  '/Asteya -website/Asteya - beach villa  (5).png',
];
const rightImages = [
  '/Asteya -website/Asteya - beach villa  (3).png',
  '/Asteya -website/Asteya - beach villa  (6).png',
];

const ActivitiesSection: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % leftImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const springTransition = {
    type: 'spring' as const,
    stiffness: 100,
    damping: 20,
  };

  const sizes = {
    base: 'w-[180px] h-[260px]',
    sm: 'sm:w-[220px] sm:h-[300px]',
    md: 'md:w-[280px] md:h-[380px]',
    lg: 'lg:w-[360px] lg:h-[480px]',
  };

  return (
    <div className="relative w-full h-[650px] sm:h-[750px] md:h-[900px] lg:h-[1000px] flex items-center justify-center overflow-hidden bg-white">
      {/* Floating Words */}
      {['OUTDOOR', 'INDOOR', 'WILL-BE'].map((word, i) => (
        <div
          key={word}
          className={`absolute left-1/2 top-1/2 z-0 -translate-x-1/2 ${
            i === 0
              ? '-translate-y-[160%] -rotate-6'
              : i === 1
              ? '-translate-y-1/2 rotate-3'
              : '-translate-y-[10%] -rotate-1'
          }`}
        >
          <svg
            className="w-[500px] h-[160px] sm:w-[600px] sm:h-[200px] md:w-[800px] md:h-[250px] lg:w-[1000px] lg:h-[300px]"
            viewBox="0 0 1000 300"
          >
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              style={{
                fontSize: '200px',
                fill: 'none',
                stroke: 'rgba(0,0,0,0.04)',
                strokeWidth: 3,
                fontFamily: 'system-ui, sans-serif',
                letterSpacing: '0.05em',
              }}
            >
              {word}
            </text>
          </svg>
        </div>
      ))}

      {/* Image Groups */}
      {[
        { images: leftImages, position: 'left-[2%] sm:left-[6%]', rotation: '-rotate-[8deg]', z: 'z-20', direction: -1 },
        { images: middleImages, position: 'left-1/2 -translate-x-1/2', rotation: 'rotate-[10deg]', z: 'z-30', direction: 0 },
        { images: rightImages, position: 'right-[2%] sm:right-[6%]', rotation: 'rotate-[15deg]', z: 'z-20', direction: 1 },
      ].map((group, i) => (
        <div
          key={i}
          className={`absolute top-[40%] sm:top-[35%] md:top-[30%] ${group.position} ${group.z} transform ${group.rotation} shadow-xl transition-all duration-700 ${sizes.base} ${sizes.sm} ${sizes.md} ${sizes.lg}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${i}-${index}`}
              initial={
                group.direction === -1
                  ? { x: -40, opacity: 0 }
                  : group.direction === 1
                  ? { x: 40, opacity: 0 }
                  : { y: 40, opacity: 0, scale: 0.95 }
              }
              animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              exit={
                group.direction === -1
                  ? { x: 40, opacity: 0 }
                  : group.direction === 1
                  ? { x: -40, opacity: 0 }
                  : { y: -40, opacity: 0, scale: 0.95 }
              }
              transition={springTransition}
              className="absolute inset-0 rounded-2xl overflow-hidden"
            >
              <Image
                src={group.images[index]}
                alt={`Villa Image ${i}`}
                fill
                sizes="(max-width: 640px) 180px, (max-width: 768px) 240px, (max-width: 1024px) 320px, 360px"
                className="object-cover rounded-2xl transition-transform duration-700 ease-in-out"
                quality={75}
                priority={i === 1 && index === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default ActivitiesSection;
