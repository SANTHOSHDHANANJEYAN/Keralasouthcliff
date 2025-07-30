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
      src: '/astega/9.jpg',
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
      src: '/astega/13.jpg',
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

          <h2 className="text-5xl md:text-6xl font-bold mb-6">Gallery Highlights</h2>
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
              className="group relative overflow-hidden rounded-xl border border-gray-200 shadow hover:shadow-md transition-all duration-500"
            >
              <div className="relative w-full h-80">
                <Image 
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 rounded-xl"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority={index < 3}
                />



                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleLike(index)}
                    className="bg-white/80 text-black hover:bg-gray-200 p-2"
                  >
                    <Heart 
                      size={16} 
                      className={likedImages.has(index) ? 'fill-black text-black' : ''} 
                    />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="bg-white/80 text-black hover:bg-gray-200 p-2"
                  >
                    <Share2 size={16} />
                  </Button>
                </div>

                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-black font-semibold text-lg mb-1 bg-white/80 px-2 py-1 rounded">
                    {image.title}
                  </h3>
                  <p className="text-sm text-gray-700 bg-white/70 px-2 py-1 rounded">
                    {image.alt}
                  </p>
                </div>

                {/* Dialog View */}
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="absolute inset-0 cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="lg"
                        className="bg-white/80 text-black hover:bg-gray-200 border border-black/10"
                      >
                        <Maximize2 className="mr-2" size={20} />
                        View Full Size
                      </Button>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl max-h-[90vh] p-0 bg-white">
                    <div className="relative w-full h-[85vh]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-contain rounded-xl"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-6">
                        <h3 className="text-black font-bold text-xl mb-2">{image.title}</h3>
                        <p className="text-gray-700">{image.alt}</p>
                        <Badge className="mt-2 bg-gray-100 text-black border border-black/10">
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
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 w-full h-96">
            <Image 
              src="https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg"
              alt="Villa Video Preview"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 px-8 py-4 border border-black/10"
              >
                <Play className="mr-3" size={24} />
                Watch Villa Tour Video
              </Button>
            </div>
            <div className="absolute bottom-6 left-6 bg-white/80 px-4 py-2 rounded shadow">
              <h3 className="text-black font-bold text-2xl mb-1">Experience Kerala Villas</h3>
              <p className="text-gray-700">Take a cinematic journey through our luxury accommodation</p>
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
              className="bg-black hover:bg-gray-900 text-white px-8 py-4 text-lg"
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
