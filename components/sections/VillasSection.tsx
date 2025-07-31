'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bed,
  Bath,
  Wifi,
  Car,
  Utensils,
  Waves,
  Mountain,
  Sun,
  Wind,
  Shield,
  Crown
} from 'lucide-react';

type VillaType = 'sea-garden-room' | 'landscape-room' | 'exclusive-villa';

const VillasSection = () => {
  const router = useRouter();
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
      price: '₹8,000',
      description:
        'Enjoy a calming blend of lush garden surroundings with a glimpse of the sea.',
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
      price: '₹8,000',
      description:
        'Scenic landscape with partial sea and garden view – perfect for slow mornings.',
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
      price: '₹12,000',
      description:
        'Book the entire villa for complete privacy, with serene sea and garden-facing rooms.',
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
    router.push('/Slots');
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Our Luxury Villas
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Choose between our three exclusive options, each offering a unique perspective 
            of Kerala's coastline and tranquil luxury.
          </p>
        </div>

        <Tabs value={selectedVilla} onValueChange={(val) => setSelectedVilla(val as VillaType)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 border border-black rounded-lg">
            <TabsTrigger value="sea-garden-room" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Sea & Garden View
            </TabsTrigger>
            <TabsTrigger value="landscape-room" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Landscape View
            </TabsTrigger>
            <TabsTrigger value="exclusive-villa" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Entire Villa
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedVilla} className="space-y-8">
            <div className="grid md:grid-cols-3 gap-4">
              {currentVilla.images.map((image, index) => (
                <div key={index} className="relative overflow-hidden rounded-lg border border-gray-200">
                  <img
                    src={image}
                    alt={`${currentVilla.name} ${index + 1}`}
                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-3xl font-bold text-black">{currentVilla.name}</h2>
                  <Badge className="bg-black text-white text-lg px-4 py-2">
                    {currentVilla.price}/night
                  </Badge>
                </div>

                <p className="text-gray-700 text-lg mb-8">{currentVilla.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {currentVilla.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-white border border-black rounded-lg">
                      <feature.icon className="text-black" size={20} />
                      <span className="text-sm font-medium text-black">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <Button
                  size="lg"
                  onClick={handleNavigateToGallery}
                  className="w-full bg-black text-white hover:bg-gray-900"
                >
                  Check Availability
                </Button>
              </div>

              <div>
                <Card className="border border-black">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-black mb-4">Amenities Included</h3>
                    <ul className="space-y-3">
                      {currentVilla.amenities.map((amenity, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0" />
                          <span className="text-black">{amenity}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default VillasSection;
