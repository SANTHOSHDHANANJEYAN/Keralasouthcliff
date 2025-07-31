'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const bgImages = {
  Apartments: '/Asteya -website/Ateya - Living area (1).png',
  Chalets: '/Asteya -website/Ateya - Living area.png',
  Hotels: '/Asteya -website/PDF - Asteya-2.png',
};

const cards = [
  { title: 'Sea & Garden View Room', image: bgImages.Apartments },
  { title: 'Landscape View Room', image: bgImages.Chalets },
  { title: 'Exclusive Villa Stay – Sea & Garden View', image: bgImages.Hotels },
];

export default function HeroSection() {
  const [bg, setBg] = useState(bgImages.Apartments);
  const [activeTitle, setActiveTitle] = useState('LUXURY VILLAS');

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={bg}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={bg}
            alt="Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        </motion.div>
      </AnimatePresence>

      {/* Foreground Text */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4 sm:px-6 md:px-10 pt-32 sm:pt-36 md:pt-0">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="uppercase tracking-widest text-xs sm:text-sm md:text-base lg:text-lg text-gray-200"
        >
          Asteya Stay Comfort
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase mt-2 drop-shadow-xl px-2"
        >
          {activeTitle}
        </motion.h1>
      </div>

      {/* Cards */}
      <div className="absolute bottom-6 md:bottom-10 left-0 right-0 z-20 px-4 sm:px-6">
        <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
          {cards.map((card) => (
            <motion.div
              key={card.title}
              className="relative w-[280px] sm:w-[300px] md:w-[320px] lg:w-[340px] xl:w-[360px] h-36 md:h-44 lg:h-52 cursor-pointer group overflow-hidden rounded-xl border border-white/20"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => {
                setBg(card.image);
                setActiveTitle(card.title);
              }}
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover filter grayscale group-hover:grayscale-0 group-hover:brightness-110 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xs sm:text-sm md:text-base font-bold text-center px-2">
                  {card.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
