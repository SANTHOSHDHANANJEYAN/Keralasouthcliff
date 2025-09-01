'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const HeroSection = () => {
  const locations = [
    {
      name: 'South Cliff',
      image: '/southcliff.jpg',
    },
    {
      name: 'North Cliff',
      image: '/northcliff.jpg',
    },
    {
      name: 'Paravur',
      image: '/paravur.jpg',
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/kerala-bg.jpg"
          alt="Kerala Tradition"
          fill
          className="object-cover opacity-30"
        />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-bold text-white z-10 text-center drop-shadow-lg"
      >
        Rishikul Yogshala Kerala
      </motion.h1>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 relative z-10 px-6 max-w-6xl">
        {locations.map((loc, index) => (
          <motion.div
            key={index}
            className="relative group rounded-2xl overflow-hidden shadow-lg cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.3 }}
          >
            <motion.div
              whileHover={{ y: -20 }} // 👈 image moves upward on hover
              transition={{ type: 'spring', stiffness: 200 }}
              className="relative w-full h-72"
            >
              <Image
                src={loc.image}
                alt={loc.name}
                fill
                className="object-cover"
              />
            </motion.div>

            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
              <p className="text-2xl font-semibold text-white">{loc.name}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
