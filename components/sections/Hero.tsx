'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Playfair_Display, Montserrat } from 'next/font/google';

// Fonts
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
  variable: '--font-playfair',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-montserrat',
});

// ✅ Use optimized webp images (add avif fallback if possible)
const slides = [
  { backgroundImage: '/homepage.png', alt: 'Luxury Villa Interior' },
  { backgroundImage: '/topfloor/4.jpg', alt: 'Villa Poolside' },
  { backgroundImage: '/astega/15.jpg', alt: 'Nature Surroundings' },
  { backgroundImage: '/astega/20.webp', alt: 'Nature Surroundings' },
  { backgroundImage: '/astega/14.webp', alt: 'Evening Ambience' },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden text-white">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.backgroundImage}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={index === 0} // ✅ first slide is critical (LCP)
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            quality={70} // ✅ balanced compression
            sizes="100vw" // ✅ responsive full-width
          />
        </div>
      ))}

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1
          className={`${playfair.className} pt-[18rem] text-5xl md:text-7xl font-bold mb-4 tracking-widest`}
          style={{ textShadow: '0px 2px 10px rgba(0,0,0,0.5)' }}
        >
          ASTEYA
        </h1>
        <p
          className={`${montserrat.className} text-lg md:text-2xl font-medium tracking-[0.25em] uppercase opacity-90`}
          style={{ textShadow: '0px 1px 6px rgba(0,0,0,0.4)' }}
        >
          Luxury. Mindfulness. Nature.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-40 h-1 bg-white/50 rounded-full overflow-hidden">
        <div className="h-full bg-white animate-progress" key={current} />
      </div>

      {/* Progress Animation */}
      <style jsx global>{`
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
