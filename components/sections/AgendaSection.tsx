'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const slides = [
  {
    headline: 'GROUND FLOOR VILLA',
    subheadline: 'SERENE & SECLUDED',
    text: `Enjoy direct beach access and a peaceful, nature-filled stay.`,
    leftImg: '/Asteya -website/Asteya - beach villa  (1).png',
    rightImg: '/Asteya -website/Asteya - beach villa  (2).png',
  },
  {
    headline: 'TOP FLOOR VILLA',
    subheadline: 'VIEWS & VIBES',
    text: `Soak in stunning sea views from your private upper retreat.`,
    leftImg: '/Asteya -website/Asteya - beach villa  (3).png',
    rightImg: '/Asteya -website/Asteya - beach villa  (4).png',
  },
  {
    headline: 'DUAL VILLAS',
    subheadline: 'CHOOSE YOUR SPACE',
    text: `Grounded calm or elevated charm — pick your perfect escape.`,
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
    <section className="w-full min-h-screen flex flex-col lg:flex-row items-center overflow-hidden relative bg-black">
      {/* Left Image */}
      <div className="w-full lg:w-1/3 h-[300px] sm:h-[400px] lg:h-screen relative">
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
      <div className="w-full lg:w-1/3 px-6 sm:px-10 xl:px-16 py-10 flex flex-col justify-center space-y-6 z-10 text-white text-center lg:text-left">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slides[index].headline}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <h2 className="text-4xl sm:text-5xl xl:text-7xl 2xl:text-[100px] leading-none font-bold">
              {slides[index].headline}
            </h2>
            <h1 className="text-2xl sm:text-3xl xl:text-5xl 2xl:text-[70px] font-black text-gray-300 mt-2">
              {slides[index].subheadline}
            </h1>
            <p className="text-sm sm:text-base xl:text-lg text-gray-400 italic mt-4 leading-relaxed">
              {slides[index].text}
            </p>
            <div className="flex justify-center lg:justify-start items-center gap-6 mt-6">
              <button
                onClick={handlePrev}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-4 border-white text-white flex items-center justify-center text-xl hover:bg-gray-800 transition"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-4 border-white text-white flex items-center justify-center text-xl hover:bg-gray-800 transition"
              >
                →
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Image */}
      <div className="w-full lg:w-1/3 h-[300px] sm:h-[400px] lg:h-screen relative">
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
