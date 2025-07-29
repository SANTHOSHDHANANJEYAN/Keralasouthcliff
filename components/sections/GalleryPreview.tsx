'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { Play, Maximize2, Heart, Share2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const GalleryPreview = () => {
  const [likedImages, setLikedImages] = useState(new Set<number>());

  const galleryImages = [
    {
      src: '/Asteya -website/Thank You 900k followers (Flyer) (3).png',
      alt: 'Beach View',
      category: 'Exterior',
      title: 'Pristine Beach Access'
    },
    {
      src: '/Asteya -website/Thank You 900k followers (Flyer) (4).png',
      alt: 'Luxury Interior',
      category: 'Interior',
      title: 'Elegant Living Space'
    },
    {
      src: '/Asteya -website/Thank You 900k followers (Flyer) (4).png',
      alt: 'Bedroom',
      category: 'Rooms',
      title: 'Master Bedroom Suite'
    },
    {
      src: '/Asteya -website/Thank You 900k followers (Flyer) (5).png',
      alt: 'Bathroom',
      category: 'Amenities',
      title: 'Luxury Bathroom'
    },
    {
      src: '/Asteya -website/Thank You 900k followers (Flyer) (1).png',
      alt: 'Sunset View',
      category: 'Views',
      title: 'Spectacular Sunset'
    },
    {
      src: '/Asteya -website/Thank You 900k followers (Flyer) (3).png',
      alt: 'Terrace',
      category: 'Outdoor',
      title: 'Private Terrace'
    }
  ];

  const toggleLike = (index: number) => {
    const newLiked = new Set(likedImages);
    newLiked.has(index) ? newLiked.delete(index) : newLiked.add(index);
    setLikedImages(newLiked);
  };

  return (
    <section className="py-24 bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gray-200 text-gray-800 text-lg px-4 py-2">
            Visual Experience
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-black mb-6">
            Gallery Highlights
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Immerse yourself in the beauty of our villas through stunning visuals 
            that capture the essence of luxury living by the Arabian Sea.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {galleryImages.map((image, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="relative w-full h-80">
                <Image 
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover grayscale group-hover:scale-110 transition-transform duration-700 rounded-xl"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority={index < 3}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/80 text-black backdrop-blur-sm">
                    {image.category}
                  </Badge>
                </div>

                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleLike(index)}
                    className="bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 p-2"
                  >
                    <Heart 
                      size={16} 
                      className={likedImages.has(index) ? 'fill-white text-white' : ''} 
                    />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 p-2"
                  >
                    <Share2 size={16} />
                  </Button>
                </div>

                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                  <p className="text-white/80 text-sm">{image.alt}</p>
                </div>

                {/* Dialog View */}
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="absolute inset-0 cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="lg"
                        className="bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 border-white/30"
                      >
                        <Maximize2 className="mr-2" size={20} />
                        View Full Size
                      </Button>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl max-h-[90vh] p-0">
                    <div className="relative w-full h-[85vh]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-contain rounded-xl"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <h3 className="text-white font-bold text-xl mb-2">{image.title}</h3>
                        <p className="text-white/80">{image.alt}</p>
                        <Badge className="mt-2 bg-white/20 text-white backdrop-blur-sm">
                          {image.category}
                        </Badge>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full h-96">
            <Image 
              src="https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg"
              alt="Villa Video Preview"
              fill
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Button
                size="lg"
                className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 px-8 py-4"
              >
                <Play className="mr-3" size={24} />
                Watch Villa Tour Video
              </Button>
            </div>
            <div className="absolute bottom-6 left-6">
              <h3 className="text-white font-bold text-2xl mb-2">Experience Kerala Villas</h3>
              <p className="text-white/80">Take a cinematic journey through our luxury accommodation</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Link href="/gallery">
            <Button 
              size="lg" 
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg"
            >
              View Full Gallery
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GalleryPreview;
