'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faInstagram,
  faYoutube,
  faTiktok,
} from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';

const iconVariants = {
  initial: { scale: 1, opacity: 0 },
  animate: { scale: 1.1, opacity: 1 },
  hover: { scale: 1.25, boxShadow: '0px 4px 15px rgba(98,125,106,0.3)' },
};

const images = [
  '/images/social-slide-1.jpg',
  '/images/social-slide-2.jpg',
  '/images/social-slide-3.jpg',
];

const SocialNetworksSection: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px] bg-[#f8f8f8] flex flex-col items-center justify-center overflow-hidden py-16">

      {/* Background Image Slideshow */}
      <div className="absolute inset-0 z-0">
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            fill
            className={`object-cover transition-opacity duration-1000 ease-in-out ${current === index ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-md" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <motion.p
          className="text-sm md:text-base lg:text-lg font-bold text-gray-700 tracking-widest uppercase mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          FOLLOW US
        </motion.p>

        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-[#627d6a] uppercase leading-none"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          NETWORKS
        </motion.h1>

        <div className="flex space-x-6 my-8 md:my-12">
          {[
            { icon: faFacebookF, url: 'https://facebook.com', label: 'Facebook' },
            { icon: faInstagram, url: 'https://instagram.com', label: 'Instagram' },
            { icon: faYoutube, url: 'https://youtube.com', label: 'YouTube' },
            { icon: faTiktok, url: 'https://tiktok.com', label: 'TikTok' },
          ].map((item) => (
            <motion.a
              key={item.label}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={iconVariants}
              initial="initial"
              whileInView="animate"
              whileHover="hover"
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-gray-300 text-gray-500 flex items-center justify-center bg-white/50 backdrop-blur-sm hover:text-[#627d6a] transition-colors duration-300"
              aria-label={item.label}
            >
              <FontAwesomeIcon icon={item.icon} className="text-xl md:text-2xl" />
            </motion.a>
          ))}
        </div>

        <motion.h2
          className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-gray-800 uppercase leading-none"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          SOCIAL
        </motion.h2>
      </motion.div>


    </div>
  );
};

export default SocialNetworksSection;
