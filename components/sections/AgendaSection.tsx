'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const slides = [
  {
    headline: 'ASTEYA',
    subheadline: 'NON-STEALING',
    text: `Practice contentment and integrity by not taking what isn’t freely given — in thoughts, actions, or resources.`,
    leftImg: 'https://images.pexels.com/photos/240040/pexels-photo-240040.jpeg',
    rightImg: 'https://images.pexels.com/photos/1553963/pexels-photo-1553963.jpeg',
  },
  {
    headline: 'GRATITUDE',
    subheadline: 'FOR WHAT IS',
    text: `True wealth is recognizing abundance in what we already have — not in what we try to possess.`,
    leftImg: 'https://images.pexels.com/photos/357155/pexels-photo-357155.jpeg',
    rightImg: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
  },
  {
    headline: 'SIMPLICITY',
    subheadline: 'IN LIVING',
    text: `A mindful life avoids exploitation and embraces mutual respect — for people and planet alike.`,
    leftImg: 'https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg',
    rightImg: 'https://images.pexels.com/photos/814499/pexels-photo-814499.jpeg',
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
    enter: (dir: string) => ({
      x: dir === 'right' ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: string) => ({
      x: dir === 'right' ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <section className="w-full h-screen flex items-center bg-[#f3f7f4] overflow-hidden relative">
      {/* Left Image */}
      <div className="w-1/3 h-full relative">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={slides[index].leftImg}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image src={slides[index].leftImg} alt="Left" fill className="object-cover" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Center Content */}
      <div className="w-1/3 px-10 flex flex-col justify-center space-y-6 z-10">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={slides[index].headline}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[100px] leading-none font-bold text-emerald-600">{slides[index].headline}</h2>
            <h1 className="text-[70px] leading-tight font-black text-emerald-900">{slides[index].subheadline}</h1>
            <p className="text-emerald-700 italic text-lg leading-relaxed mt-4">{slides[index].text}</p>

            <div className="flex items-center gap-6 mt-6">
              <button
                onClick={handlePrev}
                className="w-14 h-14 rounded-full border-4 border-emerald-400 flex items-center justify-center text-xl hover:bg-emerald-200 transition"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                className="w-14 h-14 rounded-full border-4 border-emerald-400 flex items-center justify-center text-xl hover:bg-emerald-200 transition"
              >
                →
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Image */}
      <div className="w-1/3 h-full relative">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={slides[index].rightImg}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image src={slides[index].rightImg} alt="Right" fill className="object-cover" />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
