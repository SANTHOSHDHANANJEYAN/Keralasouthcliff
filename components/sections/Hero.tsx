'use client';

import React from 'react';
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

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden text-white">
      {/* Background Image (single) */}
      <Image
        src="/homepage.png"
        alt="Luxury Villa Interior"
        fill
        className="object-cover"
        priority // ✅ critical for LCP
        loading="eager"
        decoding="async"
        quality={70}
        sizes="100vw"
      />

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
    </section>
  );
};

export default Hero;
