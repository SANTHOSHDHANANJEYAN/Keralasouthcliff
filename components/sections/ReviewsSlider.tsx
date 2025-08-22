'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
    const interval = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  const handleNext = () =>
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center mb-12">What Our Guests Say</h2>

        {/* Review Slider */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="shadow-xl border-none">
                <CardContent className="p-8 md:p-12 text-center">
                  {/* Name */}
                  <h3 className="text-2xl font-semibold mb-3">
                    {reviews[currentIndex].name}
                  </h3>
                  {/* Rating */}
                  <div className="flex justify-center mb-4">
                    {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-500 fill-yellow-500" size={20} />
                    ))}
                  </div>
                  {/* Review Text */}
                  <p className="text-lg text-gray-700 max-w-3xl mx-auto italic">
                    "{reviews[currentIndex].text}"
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-3 rounded-full hover:bg-gray-200"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-3 rounded-full hover:bg-gray-200"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-black' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
