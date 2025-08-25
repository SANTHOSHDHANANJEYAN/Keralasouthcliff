'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';

// Safer motion import with fallback
let motion: any;
let AnimatePresence: any;

try {
  const framerMotion = require('framer-motion');
  motion = framerMotion.motion;
  AnimatePresence = framerMotion.AnimatePresence;
} catch (error) {
  console.warn('Framer Motion not available, using div fallback', error);
  motion = {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  };
  AnimatePresence = ({ children }: any) => <>{children}</>;
}

const reviews = [
  {
    name: "Vikash Ram",
    rating: 5,
    text: "I had the most wonderful time staying at this beach view property! From the moment I arrived, I was captivated by the breathtaking views of the ocean—waking up to the sound of waves and watching sunsets right from the balcony was pure magic.",
  },
  {
    name: "Hindu Shree S",
    rating: 5,
    text: "Had an amazing time staying at the beach resort! The location was perfect—just a few steps from the beach, making it super convenient for early morning walks and sunset views. 🌅",
  },
  {
    name: "Asmita Ranjan",
    rating: 5,
    text: "Asteya is an amazing property - 100% recommend. The view, the location, the huge rooms with bathrooms - all worth the money and more. Arif is a great host, always available with the best recommendations.",
  },
  {
    name: "NANDAKISHOR R",
    rating: 5,
    text: "This beach stay was absolutely amazing! The view of the sea was just perfect, and we could hear the waves all day. The rooms were super comfy and had a nice relaxed vibe. Definitely a great spot to chill by the beach.",
  },
  {
    name: "jyothisjy j",
    rating: 5,
    text: "I stayed at this property with my family, and it felt just like a beach house — the perfect getaway in Varkala, ideal for both couples and families. Loved the private area with direct sea views.",
  },
  {
    name: "Riya Ganer",
    rating: 5,
    text: "I loved my stay at Asteya. Located at a prime location in Varkala, beach-facing on a cliff. The sunsets here were a sight to behold. One of the most peaceful and enriching experiences.",
  },
  {
    name: "jai 1994",
    rating: 5,
    text: "A Perfect Weekend Getaway! The property is beautifully maintained, calm, and peaceful. The sea-view rooms were a highlight — waking up to the sound of waves was truly special. Loved the private beach access!",
  },
];

export default function ReviewsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => handleNext(), 7000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  const handleNext = () =>
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));

  return (
    <section className="py-24 bg-gradient-to-b from-gray-100 via-white to-gray-50 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          What Our Guests Say
        </h2>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -30 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="backdrop-blur-lg bg-white/80 shadow-xl rounded-3xl p-10 max-w-2xl mx-auto relative"
            >
              {/* Floating Google Badge */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-6 left-6 w-14 h-14 bg-white rounded-full shadow flex items-center justify-center border"
              >
                <Image
                  src="/googleico.jpg"
                  alt="Google"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </motion.div>

              {/* Review Text */}
              <p className="text-gray-700 text-lg mb-6 leading-relaxed italic text-center">
                &quot;{reviews[currentIndex].text}&quot;
              </p>

              {/* Star Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: i < reviews[currentIndex].rating ? 1 : 0.7 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Star
                      size={22}
                      className={
                        i < reviews[currentIndex].rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }
                    />
                  </motion.div>
                ))}
              </div>

              {/* Reviewer */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-xl font-bold text-white shadow">
                  {reviews[currentIndex].name.charAt(0)}
                </div>
                <span className="mt-3 text-gray-800 font-semibold text-lg">
                  {reviews[currentIndex].name}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-md shadow-lg p-3 rounded-full hover:scale-110 transition"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-md shadow-lg p-3 rounded-full hover:scale-110 transition"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-black scale-125" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
