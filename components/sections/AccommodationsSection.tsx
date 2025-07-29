'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const bgImages = {
  Apartments: '/Asteya -website/Ateya - Living area (1).png',
  Chalets: '/Asteya -website/Ateya - Living area.png',
  Hotels: '/Asteya -website/PDF - Asteya-2.png',
  Individuals: '/Asteya -website/PDF - Asteya-7.png',
};

const cards = [
  { title: 'Apartments', image: bgImages.Apartments },
  { title: 'Chalets', image: bgImages.Chalets },
  { title: 'Hotels', image: bgImages.Hotels },
  { title: 'Individuals', image: bgImages.Individuals },
];

export default function HeroSection() {
  const [bg, setBg] = useState(bgImages.Individuals);
  const [activeTitle, setActiveTitle] = useState('Individuals');

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

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4 pb-[20rem]">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="uppercase tracking-widest text-sm md:text-lg text-gray-200"
        >
          Our Accommodations
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-5xl md:text-7xl font-extrabold uppercase mt-2 drop-shadow-xl"
        >
          {activeTitle}
        </motion.h1>

        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 py-3 px-6 rounded bg-white text-black text-sm md:text-base font-semibold transition-all duration-300 shadow-lg hover:bg-black hover:text-white border border-white"
        >
          See All Private Rental Companies
        </motion.button>
      </div>

      {/* Cards */}
      <div className="absolute bottom-0 left-0 right-0 px-4 md:px-10 pb-8 z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <motion.div
              key={card.title}
              className="relative h-40 md:h-48 lg:h-56 cursor-pointer group overflow-hidden rounded-xl border border-white/20"
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
                <h3 className="text-white text-lg md:text-xl font-bold">
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
