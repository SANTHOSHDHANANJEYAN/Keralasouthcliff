'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutOurStory = () => {
  return (
    <section className="relative bg-white text-[#1a1a1a] py-16 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-snug text-black">
            Asteya Story
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-[#555]">
            Asteya Villas was born from a heartfelt desire to offer a tranquil escape from the noise of everyday life where luxury and nature live in harmony.
            Nestled amidst serene landscapes, Asteya is a sanctuary designed for rest, reflection, and renewal.
            Each villa is carefully crafted to blend contemporary elegance with soulful charm, creating a space that inspires stillness and self-connection.
            <br /><br />
            At Asteya, we believe true luxury lies in simplicity and authenticity.
            That’s why every detail from the architecture to the scents, sounds, and materials is curated to awaken your senses and ground you in the present moment.
            Whether you are here for a peaceful solo retreat, a romantic getaway, or a gathering of loved ones, our spaces nurture genuine connection with self, others, and nature.
            <br /><br />
            More than just a place to stay, Asteya is a philosophy of mindful living.
            It is where time slows down, distractions fade, and every moment is infused with presence.
            We invite you to step into a world of timeless serenity and soulful hospitality and leave with a renewed spirit, lighter heart, and deeper sense of peace.
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="h-full"
        >
          <div className="relative h-[400px] md:h-[550px] w-full overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="/astega/23.webp"  // ✅ convert to webp
              alt="Our Story"
              fill
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105 grayscale"
              // ❌ remove priority (not hero image)
              loading="lazy"   // ✅ defer until scrolled into view
              decoding="async"
              sizes="(max-width: 768px) 100vw,
                     (max-width: 1200px) 50vw,
                     50vw"
              quality={70} // ✅ balance quality & performance
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutOurStory;
