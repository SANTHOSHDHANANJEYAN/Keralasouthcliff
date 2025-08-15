'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Playfair_Display, Montserrat } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500'] });

const slides = [
  {
    backgroundImage: '/astega/5.jpg',
  },
  {
    backgroundImage: '/astega/9.jpg',
  },
  {
    backgroundImage: '/astega/14.jpg',
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative min-h-screen w-full overflow-hidden text-white">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <Image
            src={slide.backgroundImage}
            alt="Background"
            fill
            className="object-cover"
            priority={index === current}
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Static Text Content (unchanging) */}
      <div className=" absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1
          className={`${playfair.className} pt-[6rem] text-5xl md:text-7xl font-bold mb-4 tracking-widest`}
          style={{ textShadow: '0px 2px 10px rgba(0,0,0,0.5)' }}
        >
          ASTEYA
        </h1>
        <p
          className={`${montserrat.className} text-lg md:text-2xl font-medium tracking-[0.25em] uppercase opacity-90`}
          style={{ textShadow: '0px 1px 6px rgba(0,0,0,0.4)' }}
        >
          LUXURY. MINDFULNESS. NATURE.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-40 h-1 bg-white/50 rounded-full overflow-hidden">
        <div className="h-full bg-white animate-progress" key={current} />
      </div>

      {/* Progress Animation */}
      <style jsx>{`
        @keyframes progressFill {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progressFill 6s linear forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;
