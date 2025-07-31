'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutOurStory = () => {
  return (
    <section className="relative bg-white text-[#2f2f2f] py-16 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-snug text-[#627d6a]">
            Our Story
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-gray-700">
            Asteya Villas was born from a desire to create an intimate and peaceful escape where luxury meets nature.
            Each detail has been designed to provide a sense of harmony, balance, and refined comfort for our guests.
            Whether you’re here to rest, reflect, or reconnect, Asteya offers a space where time slows down and serenity takes over.
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full h-full relative"
        >
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="/astega/7.jpg"
              alt="Our Story"
              width={800}
              height={600}
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutOurStory;
