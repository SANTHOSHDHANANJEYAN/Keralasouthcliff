'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const slides = [
  {
    headline: '100%-',
    subheadline: 'PEDESTRIAN',
    text: `Avoriaz is a 100% pedestrian resort, so you can ditch the car for a stay where everything is accessible on foot or by bike. A paradise for children with a unique and magical atmosphere, far removed from everyday life.`,
    leftImg: 'https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg',
    rightImg: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
  },
  {
    headline: 'ZERO',
    subheadline: 'CARS',
    text: `Experience peace and fresh air. Our village promotes a healthy, car-free lifestyle, allowing visitors to explore naturally.`,
    leftImg: 'https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg',
    rightImg: 'https://images.pexels.com/photos/237325/pexels-photo-237325.jpeg',
  },
  {
    headline: 'WALK',
    subheadline: 'FREELY',
    text: `Take a break from traffic and stroll through scenic routes designed for people, not vehicles.`,
    leftImg: 'https://images.pexels.com/photos/208739/pexels-photo-208739.jpeg',
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
    <section className="w-full h-screen flex items-center bg-[#f6f6f4] overflow-hidden relative">
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
            <h2 className="text-[120px] leading-none font-bold text-orange-400">{slides[index].headline}</h2>
            <h1 className="text-[90px] leading-tight font-black text-neutral-900">{slides[index].subheadline}</h1>
            <p className="text-blue-900 italic text-lg leading-relaxed mt-4">{slides[index].text}</p>

            <div className="flex items-center gap-6 mt-6">
              <button
                onClick={handlePrev}
                className="w-14 h-14 rounded-full border-4 border-orange-300 flex items-center justify-center text-xl hover:bg-orange-200 transition"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                className="w-14 h-14 rounded-full border-4 border-orange-300 flex items-center justify-center text-xl hover:bg-orange-200 transition"
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
