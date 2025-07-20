'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const bgImages = {
  Apartments: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
  Chalets: 'https://images.unsplash.com/photo-1619129237645-3a0c28996c4e',
  Hotels: 'https://images.unsplash.com/photo-1588789158400-3098d65c6ef9',
  Individuals: 'https://images.unsplash.com/photo-1585299237731-03b9a2797824',
};

const cards = [
  { title: 'Apartments', image: bgImages.Apartments },
  { title: 'Chalets', image: bgImages.Chalets },
  { title: 'Hotels', image: bgImages.Hotels },
  { title: 'Individuals', image: bgImages.Individuals },
];

export default function HeroSection() {
  const [bg, setBg] = useState(bgImages.Individuals);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Fade Transition */}
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
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </motion.div>
      </AnimatePresence>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4 pb-[20rem]">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="uppercase text-orange-500 tracking-widest text-sm md:text-lg"
        >
          Our Accommodations
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-5xl md:text-7xl font-extrabold uppercase mt-2"
        >
          Individuals
        </motion.h1>

        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 bg-orange-500 text-white py-3 px-6 rounded hover:bg-orange-600 transition duration-300"
        >
          See All Private Rental Companies
        </motion.button>
      </div>

      {/* Cards at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 px-4 md:px-10 pb-8 z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="relative h-40 md:h-48 lg:h-56 cursor-pointer group overflow-hidden rounded"
              onClick={() => setBg(card.image)}
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-40 transition duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-lg md:text-xl font-bold">
                  {card.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
