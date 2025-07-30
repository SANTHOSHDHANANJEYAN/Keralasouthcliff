'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Image as ImageIcon,
  Home,
  Sofa,
  BedDouble,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Category = 'all' | 'exterior' | 'interior' | 'rooms';

const galleryData: Record<Exclude<Category, 'all'>, { src: string; alt: string }[]> = {
  exterior: [
    { src: '/astega/1.jpg', alt: 'Beach View' },
    { src: '/astega/2.jpg', alt: 'Sunset View' },
    { src: '/astega/5.jpg', alt: 'Terrace' },
    { src: '/astega/6.jpg', alt: 'Cliff View' },
    { src: '/astega/7.jpg', alt: 'Cliff View' },
    { src: '/astega/10.jpg', alt: 'Cliff View' },
    { src: '/astega/15.jpg', alt: 'Cliff View' },
    { src: '/astega/20.jpg', alt: 'Cliff View' },
    { src: '/astega/21.jpg', alt: 'Cliff View' },
    { src: '/astega/22.jpg', alt: 'Cliff View' },
    { src: '/astega/31.jpg', alt: 'Cliff View' },
  ],
  interior: [
    { src: '/astega/3.jpg', alt: 'Luxury Interior' },
    { src: '/astega/4.jpg', alt: 'Bedroom' },
    { src: '/astega/8.jpg', alt: 'Bathroom' },
    { src: '/astega/9.jpg', alt: 'Living Area' },
    { src: '/astega/11.jpg', alt: 'Cliff View' },
    { src: '/astega/12.jpg', alt: 'Cliff View' },
    { src: '/astega/13.jpg', alt: 'Cliff View' },
    { src: '/astega/14.jpg', alt: 'Cliff View' },
    { src: '/astega/16.jpg', alt: 'Cliff View' },
    { src: '/astega/17.jpg', alt: 'Cliff View' },
    { src: '/astega/18.jpg', alt: 'Cliff View' },
    { src: '/astega/19.jpg', alt: 'Cliff View' },
    { src: '/astega/25.jpg', alt: 'Cliff View' },
    { src: '/astega/26.jpg', alt: 'Cliff View' },
    { src: '/astega/27.jpg', alt: 'Cliff View' },
    { src: '/astega/28.jpg', alt: 'Cliff View' },
    { src: '/astega/29.jpg', alt: 'Cliff View' },
    { src: '/astega/30.jpg', alt: 'Cliff View' },
    { src: '/astega/32.jpg', alt: 'Cliff View' },
  ],
  rooms: [
    { src: '/Asteya -website/PDF - Asteya-2.png', alt: 'Master Bedroom' },
  

  ],
};

const iconMap: Record<Category, JSX.Element> = {
  all: <ImageIcon className="w-4 h-4 mr-2" />,
  exterior: <Home className="w-4 h-4 mr-2" />,
  interior: <Sofa className="w-4 h-4 mr-2" />,
  rooms: <BedDouble className="w-4 h-4 mr-2" />,
};

const GallerySection = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const allImages = Object.values(galleryData).flat();
  const currentImages = selectedCategory === 'all' ? allImages : galleryData[selectedCategory];

  return (
    <section className="py-24 bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-black text-white uppercase rounded-full px-4 py-2 shadow-sm">
            Visual Experience
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Photo Gallery</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Explore our stunning collection of images showcasing the beauty and luxury 
            of Kerala South Cliff Beach View Villas.
          </p>
        </div>

        <Tabs
          value={selectedCategory}
          onValueChange={(val) => setSelectedCategory(val as Category)}
          className="w-full"
        >
<TabsList className="flex w-full gap-2 overflow-x-auto mb-10 bg-transparent  px-2 py-1 border-b-2 border-gray-300 scrollbar-hide">
  {(['all', 'exterior', 'interior', 'rooms'] as Category[]).map((cat) => (
    <TabsTrigger
      key={cat}
      value={cat}
      className="flex items-center whitespace-nowrap px-4 py-2 text-black data-[state=active]:bg-[#627d6a] data-[state=active]:text-white rounded-md font-medium transition-all duration-200"
    >
      {iconMap[cat]}
      {cat.charAt(0).toUpperCase() + cat.slice(1)}
    </TabsTrigger>
  ))}
</TabsList>


          <AnimatePresence mode="wait">
            <TabsContent key={selectedCategory} value={selectedCategory} forceMount>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {currentImages.map((image, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 cursor-pointer bg-white border border-gray-200">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={600}
                        height={400}
                        className="w-full h-64 object-cover group-hover:scale-105 group-hover:brightness-105 transition-transform duration-700"
                      />

                        <div className="absolute bottom-4 left-4">
                          <Badge className="bg-white text-black border border-gray-300 shadow-sm">
                            {image.alt}
                          </Badge>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-white">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={1200}
                      height={800}
                      className="w-full h-full object-contain rounded-lg"
                    />
                    </DialogContent>
                  </Dialog>
                ))}
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </section>
  );
};

export default GallerySection;
