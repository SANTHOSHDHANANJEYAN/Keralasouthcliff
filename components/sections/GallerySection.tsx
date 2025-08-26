'use client';

import { useState } from 'react';
import { X, Filter } from 'lucide-react';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Photos' },
    { id: 'training', name: 'Training Sessions' },
    { id: 'facility', name: 'Our Facility' },
    { id: 'kerala', name: 'Kerala Beauty' },
    { id: 'graduation', name: 'Graduations' },
    { id: 'retreat', name: 'Retreats' }
  ];

  const images = [
    { src: '/astega/1-min.jpg', alt: 'Beach View', category: 'kerala' },
    { src: '/astega/2-min.jpg', alt: 'Sunset View', category: 'kerala' },
    { src: '/astega/5-min.jpg', alt: 'Terrace', category: 'facility' },
    { src: '/astega/6-min.jpg', alt: 'Cliff View', category: 'kerala' },
    { src: '/astega/7-min.jpg', alt: 'Cliff View', category: 'kerala' },
    { src: '/astega/10-min.jpg', alt: 'Cliff View', category: 'kerala' },
    { src: '/astega/15-min.jpg', alt: 'Cliff View', category: 'kerala' },
    { src: '/astega/20-min.jpg', alt: 'Cliff View', category: 'kerala' },
    { src: '/astega/21-min.jpg', alt: 'Cliff View', category: 'kerala' },
    { src: '/astega/22-min.jpg', alt: 'Cliff View', category: 'kerala' },
    { src: '/astega/31-min.jpg', alt: 'Cliff View', category: 'kerala' },
    { src: '/astega/11-min.jpg', alt: 'Interior View', category: 'facility' },
    { src: '/astega/12-min.jpg', alt: 'Modern Finish', category: 'facility' },
    { src: '/astega/13-min.jpg', alt: 'Decor', category: 'facility' },
    { src: '/astega/14-min.jpg', alt: 'Details', category: 'facility' },
    { src: '/astega/16-min.jpg', alt: 'Living Room', category: 'facility' },
    { src: '/astega/17-min.jpg', alt: 'Cozy Corner', category: 'facility' },
    { src: '/astega/18-min.jpg', alt: 'Design', category: 'facility' },
    { src: '/astega/19-min.jpg', alt: 'Hallway', category: 'facility' },
    { src: '/astega/25-min.jpg', alt: 'Lounge', category: 'facility' },
    { src: '/astega/26-min.jpg', alt: 'TV Area', category: 'facility' },
    { src: '/astega/27-min.jpg', alt: 'Furniture', category: 'facility' },
    { src: '/astega/29-min.jpg', alt: 'Dining', category: 'facility' },
    { src: '/astega/30-min.jpg', alt: 'Room Decor', category: 'facility' },
    { src: '/astega/PDF - Asteya-1-min.png', alt: 'Master Bedroom', category: 'facility' },
    { src: '/astega/3-min.jpg', alt: 'Luxury Interior', category: 'facility' },
    { src: '/astega/4-min.jpg', alt: 'Bedroom', category: 'facility' },
    { src: '/astega/8-min.jpg', alt: 'Bathroom', category: 'facility' }
  ];

  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter(image => image.category === selectedCategory);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Our <span className="text-gradient">Gallery</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the beauty of our ashram, the serenity of Kerala, and the joy of learning through these captured moments.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Filter className="h-5 w-5 text-gray-500 mr-4" />
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <div 
                key={`${selectedCategory}-${index}`}
                className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group aspect-square"
                onClick={() => setSelectedImage(image.src)}
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                    <p className="text-sm font-medium">Click to enlarge</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-5xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <X className="h-6 w-6" />
            </button>
            <img 
              src={selectedImage} 
              alt="Gallery image"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Create Your Own Memories?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join us at Rishikul Yogshala Kerala and become part of our beautiful yoga community.
          </p>
          <button className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
            Book Your Program Today
          </button>
        </div>
      </section>
    </div>
  );
}
