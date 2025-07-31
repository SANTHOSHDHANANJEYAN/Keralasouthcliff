'use client';

import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faYoutube,
  faGoogle,
  faAirbnb,
} from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';

const SocialNetworksSection: React.FC = () => {
  const backgroundImage = '/ani.gif'; // Replace with your static background image

  return (
    <div className="relative w-full min-h-[500px] md:min-h-[650px] lg:min-h-[800px] bg-white flex flex-col items-center justify-center overflow-hidden py-12 md:py-16 lg:py-20">
      {/* Static Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
      </div>

      {/* Foreground Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="text-sm md:text-base tracking-widest text-neutral-500 uppercase font-medium mb-4">
          Follow Us
        </p>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-black uppercase leading-none"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          NETWORKS
        </motion.h1>

        {/* Social Icons */}
        <div className="flex flex-wrap justify-center gap-5 md:gap-6 my-6 md:my-10">
          {[
            {
              icon: faInstagram,
              url: 'https://instagram.com',
              label: 'Instagram',
            },
            {
              icon: faYoutube,
              url: 'https://youtube.com',
              label: 'YouTube',
            },
            {
              icon: faAirbnb,
              url: 'https://www.airbnb.com/',
              label: 'Airbnb',
            },
            {
              icon: faGoogle,
              url: 'https://www.google.com/maps/',
              label: 'Google',
            },
          ].map((item) => (
            <motion.a
              key={item.label}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border border-black bg-white text-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 shadow"
              aria-label={item.label}
            >
              <FontAwesomeIcon icon={item.icon} className="text-lg sm:text-xl md:text-2xl" />
            </motion.a>
          ))}
        </div>

        <motion.h2
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 uppercase leading-none"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          SOCIAL
        </motion.h2>
      </motion.div>
    </div>
  );
};

export default SocialNetworksSection;
