'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const slides = [
  {
    headline: 'CLARITY',
    subheadline: 'BLACK AND WHITE',
    text: `See the world with honesty and bold contrast — where truth stands out, and distractions fade away.`,
    leftImg: '/Asteya -website/Asteya - beach villa  (1).png',
    rightImg: '/Asteya -website/Asteya - beach villa  (2).png',
  },
  {
    headline: 'BALANCE',
    subheadline: 'LIGHT AND SHADOW',
    text: `Both light and shadow define form. Embrace duality — in simplicity lies harmony.`,
    leftImg: '/Asteya -website/Asteya - beach villa  (3).png',
    rightImg: '/Asteya -website/Asteya - beach villa  (4).png',
  },
  {
    headline: 'ESSENCE',
    subheadline: 'NO FILTER',
    text: `Strip away the excess. What remains is essential, pure, and unmistakably true.`,
    leftImg: '/Asteya -website/Asteya - beach villa  (5).png',
    rightImg: '/Asteya -website/Asteya - beach villa .png',
  },
];

export default function AgendaSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const handleNext = () => {
    setDirection('right');
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection('left');
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const variants = {
    enter: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
    exit: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? -300 : 300,
      opacity: 0,
      transition: { duration: 0.6 },
    }),
  };

  return (
    <section className="w-full h-screen flex items-center overflow-hidden relative bg-black">
      {/* Left Image */}
      <div className="w-1/3 h-full relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slides[index].leftImg}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <Image src={slides[index].leftImg} alt="Left" fill className="object-cover" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Center Content */}
      <div className="w-1/3 px-10 flex flex-col justify-center space-y-6 z-10 text-white">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slides[index].headline}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <h2 className="text-[100px] leading-none font-bold text-white">{slides[index].headline}</h2>
            <h1 className="text-[70px] leading-tight font-black text-gray-300">{slides[index].subheadline}</h1>
            <p className="text-gray-400 italic text-lg leading-relaxed mt-4">{slides[index].text}</p>
            <div className="flex items-center gap-6 mt-6">
              <button
                onClick={handlePrev}
                className="w-14 h-14 rounded-full border-4 border-white text-white flex items-center justify-center text-xl hover:bg-gray-800 transition"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                className="w-14 h-14 rounded-full border-4 border-white text-white flex items-center justify-center text-xl hover:bg-gray-800 transition"
              >
                →
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Image */}
      <div className="w-1/3 h-full relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slides[index].rightImg}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <Image src={slides[index].rightImg} alt="Right" fill className="object-cover" />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
