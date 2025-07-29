'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

type Category = 'all' | 'exterior' | 'interior' | 'rooms' | 'amenities';

const galleryData: Record<Exclude<Category, 'all'>, { src: string; alt: string }[]> = {
  exterior: [
    { src: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg', alt: 'Beach View' },
    { src: 'https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg', alt: 'Sunset View' },
    { src: 'https://images.pexels.com/photos/1722183/pexels-photo-1722183.jpeg', alt: 'Terrace' },
    { src: 'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg', alt: 'Cliff View' },
  ],
  interior: [
    { src: 'https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg', alt: 'Luxury Interior' },
    { src: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg', alt: 'Bedroom' },
    { src: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg', alt: 'Bathroom' },
    { src: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg', alt: 'Living Area' },
  ],
  rooms: [
    { src: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg', alt: 'Master Bedroom' },
    { src: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg', alt: 'Luxury Bathroom' },
    { src: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg', alt: 'Living Room' },
    { src: 'https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg', alt: 'Dining Area' },
  ],
  amenities: [
    { src: 'https://images.pexels.com/photos/1722183/pexels-photo-1722183.jpeg', alt: 'Private Terrace' },
    { src: 'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg', alt: 'Kitchenette' },
    { src: 'https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg', alt: 'Relaxation Area' },
    { src: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg', alt: 'Beach Access' },
  ]
};

const GallerySection = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const allImages = Object.values(galleryData).flat();
  const currentImages = selectedCategory === 'all' ? allImages : galleryData[selectedCategory];

  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-white text-black uppercase">Visual Experience</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Photo Gallery</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our stunning collection of images showcasing the beauty and luxury 
            of Kerala South Cliff Beach View Villas.
          </p>
        </div>

        <Tabs value={selectedCategory} onValueChange={(val) => setSelectedCategory(val as Category)} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-10 bg-white/10 border border-white/20 rounded-lg overflow-hidden">
            {['all', 'exterior', 'interior', 'rooms', 'amenities'].map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="text-white data-[state=active]:bg-white data-[state=active]:text-black"
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentImages.map((image, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-white/30 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
                      <img 
                        src={image.src} 
                        alt={image.alt}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Badge className="bg-white/10 text-white border border-white/20 backdrop-blur-sm">
                          {image.alt}
                        </Badge>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-black">
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default GallerySection;
