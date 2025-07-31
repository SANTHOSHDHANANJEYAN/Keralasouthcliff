'use client';

import React, { useState } from 'react';
import {
  Bed, Bath, Wifi, Car, Waves, Mountain, Sun, Shield, Crown
} from 'lucide-react';

type VillaType = 'sea-garden-room' | 'landscape-room' | 'exclusive-villa';

const VillasSection = () => {
  const [selectedVilla, setSelectedVilla] = useState<VillaType>('sea-garden-room');

  const villas: Record<VillaType, {
    name: string;
    price: string;
    description: string;
    features: { icon: React.ElementType; text: string }[];
    amenities: string[];
    images: string[];
  }> = {
    'sea-garden-room': {
      name: 'Sea & Garden View Room',
      price: '₹8,500',
      description: 'Enjoy a calming blend of lush garden surroundings with a glimpse of the sea.',
      features: [
        { icon: Bed, text: '1 Bedroom' },
        { icon: Bath, text: '1 Bathroom' },
        { icon: Waves, text: 'Sea Glimpse' },
        { icon: Mountain, text: 'Garden Facing' },
        { icon: Wifi, text: 'High-Speed WiFi' },
        { icon: Shield, text: '24/7 Security' }
      ],
      amenities: [
        'Comfortable double bed',
        'Private garden-facing patio',
        'Elegant en-suite bathroom',
        'Air conditioning and ceiling fan',
        'Complimentary WiFi',
        'Daily housekeeping service'
      ],
      images: [
        'https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg',
        'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg',
        'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg'
      ]
    },
    'landscape-room': {
      name: 'Landscape View Room',
      price: '₹8,500',
      description: 'Scenic landscape with partial sea and garden view – perfect for slow mornings.',
      features: [
        { icon: Bed, text: '1 Bedroom' },
        { icon: Bath, text: '1 Bathroom' },
        { icon: Mountain, text: 'Landscape View' },
        { icon: Sun, text: 'Natural Light' },
        { icon: Wifi, text: 'High-Speed WiFi' },
        { icon: Car, text: 'Free Parking' }
      ],
      amenities: [
        'Large window with scenic views',
        'Cozy reading corner',
        'Modern bathroom amenities',
        'Complimentary WiFi',
        'Air conditioning',
        'Daily housekeeping'
      ],
      images: [
        'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
        'https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg',
        'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg'
      ]
    },
    'exclusive-villa': {
      name: 'Exclusive Villa Stay – Sea & Garden View',
      price: '₹16,000',
      description: 'Book the entire villa for complete privacy, with serene sea and garden-facing rooms.',
      features: [
        { icon: Bed, text: '2 Bedrooms' },
        { icon: Bath, text: '2 Bathrooms' },
        { icon: Waves, text: 'Sea View' },
        { icon: Mountain, text: 'Garden View' },
        { icon: Wifi, text: 'High-Speed WiFi' },
        { icon: Crown, text: 'Exclusive Privacy' }
      ],
      amenities: [
        'Entire villa for your group',
        'Private balconies and patio',
        'Spacious common areas',
        'Full-service kitchen',
        'Butler and concierge services',
        'Daily housekeeping',
        'High-speed WiFi'
      ],
      images: [
        'https://images.pexels.com/photos/210557/pexels-photo-210557.jpeg',
        'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
        'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg'
      ]
    }
  };

  const currentVilla = villas[selectedVilla];

  const handleNavigateToGallery = () => {
    window.location.href = '/Slots';
  };

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">Our Asteya's Luxury Villas</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our luxurious villas, each with a unique view and premium amenities.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex sm:grid sm:grid-cols-3 gap-2 overflow-x-auto mb-8 border border-black rounded-lg p-1 no-scrollbar">
          {(['sea-garden-room', 'landscape-room', 'exclusive-villa'] as VillaType[]).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedVilla(key)}
              className={`flex-1 px-4 py-2 text-sm sm:text-base font-medium rounded ${
                selectedVilla === key ? 'bg-black text-white' : 'text-black'
              }`}
            >
              {villas[key].name.split(' – ')[0]}
            </button>
          ))}
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {currentVilla.images.map((image, index) => (
            <div key={index} className="overflow-hidden rounded-lg border border-gray-200">
              <img
                src={image}
                alt={`villa-${index}`}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <h3 className="text-2xl font-bold text-black">{currentVilla.name}</h3>
              <span className="bg-black text-white text-base px-3 py-1.5 rounded-full">
                {currentVilla.price}/night
              </span>
            </div>

            <p className="text-gray-700 mb-6">{currentVilla.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {currentVilla.features.map(({ icon: Icon, text }, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 border border-black rounded-md bg-white"
                >
                  <Icon className="text-black" size={20} />
                  <span className="text-sm font-medium text-black">{text}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleNavigateToGallery}
              className="px-5 py-3 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Check Availability
            </button>
          </div>

          {/* Amenities */}
          <div className="border border-black rounded-lg p-6 bg-white">
            <h4 className="text-lg font-semibold text-black mb-4">Amenities Included</h4>
            <ul className="space-y-3">
              {currentVilla.amenities.map((amenity, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-black" />
                  <span className="text-sm text-black">{amenity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VillasSection;
