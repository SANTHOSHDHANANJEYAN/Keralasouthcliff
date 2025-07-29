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
const bgImages = [
  '/backgrounds/activities-bg1.jpg',
  '/backgrounds/activities-bg2.jpg',
  '/backgrounds/activities-bg3.jpg',
];

const ActivitiesSection: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % leftImages.length);
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const springTransition = {
    type: 'spring' as const,
    stiffness: 100,
    damping: 20,
  };

  return (
    <div className="relative w-full h-[700px] md:h-[900px] lg:h-[1000px] overflow-hidden flex items-center justify-center bg-black">
      <div className="absolute inset-0 -z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${bgIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4 }}
            className="absolute inset-0"
          >
            <Image
              src={bgImages[bgIndex]}
              alt="Background"
              fill
              className="object-cover"
              quality={75}
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Title */}
      <div className="absolute top-14 z-30 text-center w-full">
        <div className="bg-black/30 backdrop-blur-md px-6 py-4 rounded-xl inline-block border border-white/20 shadow-md">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-[0.25em] uppercase">
            Activities
          </h2>
          <div className="w-20 h-1 bg-white mx-auto mt-2 rounded-full" />
        </div>
      </div>

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
            className="w-[600px] h-[200px] md:w-[800px] md:h-[250px] lg:w-[1000px] lg:h-[300px]"
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
                stroke: 'rgba(255,255,255,0.04)',
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

      {/* Images */}
      {[
        { images: leftImages, position: 'left-[5%] md:left-[10%]', rotation: '-rotate-[8deg]', z: 'z-20', direction: -1 },
        { images: middleImages, position: 'left-1/2 -translate-x-1/2', rotation: 'rotate-[10deg]', z: 'z-30', direction: 0 },
        { images: rightImages, position: 'right-[5%] md:right-[10%]', rotation: 'rotate-[15deg]', z: 'z-20', direction: 1 },
      ].map((group, i) => (
        <div
          key={i}
          className={`absolute top-[40%] md:top-[30%] ${group.position} ${group.z} transform ${group.rotation} shadow-2xl transition-all duration-700 w-[260px] h-[360px] md:w-[320px] md:h-[430px] lg:w-[360px] lg:h-[480px]`}
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
                alt="Activity"
                fill
                className="object-cover rounded-2xl grayscale hover:grayscale-0 hover:scale-[1.03] transition-transform duration-700 ease-in-out"
                quality={85}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default ActivitiesSection;
