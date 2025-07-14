'use client';

import React, { useState } from 'react';
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

type VillaType = 'ground-floor' | 'top-floor';

const VillasSection = () => {
  const [selectedVilla, setSelectedVilla] = useState<VillaType>('ground-floor');

  const villas: Record<VillaType, {
    name: string;
    price: string;
    description: string;
    features: { icon: React.ElementType; text: string }[];
    amenities: string[];
    images: string[];
  }> = {
    'ground-floor': {
      name: 'Ground Floor Villa',
      price: '$8,500',
      description:
        'Experience luxury at sea level with direct beach access and private terrace. Feel the ocean breeze and hear the rhythmic waves from your private sanctuary.',
      features: [
        { icon: Bed, text: '2 Bedrooms' },
        { icon: Bath, text: '2 Bathrooms' },
        { icon: Waves, text: 'Direct Beach Access' },
        { icon: Wind, text: 'Private Terrace' },
        { icon: Wifi, text: 'High-Speed WiFi' },
        { icon: Car, text: 'Private Parking' },
        { icon: Utensils, text: 'Kitchenette' },
        { icon: Shield, text: '24/7 Security' }
      ],
      amenities: [
        'King-size bed with premium linens',
        'Private terrace with beach furniture',
        'Direct access to pristine beach',
        'Marble bathroom with rainfall shower',
        'Fully equipped modern kitchenette',
        'Air conditioning and ceiling fans',
        'Complimentary high-speed WiFi',
        'Daily housekeeping service'
      ],
      images: [
        'https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg',
        'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg',
        'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg'
      ]
    },
    'top-floor': {
      name: 'Top Floor Villa',
      price: '$8,500',
      description:
        'Elevated luxury with breathtaking panoramic views of the Arabian Sea and cliff formations. Watch spectacular sunsets from your private balcony high above the coastline.',
      features: [
        { icon: Bed, text: '2 Bedrooms' },
        { icon: Bath, text: '2 Bathrooms' },
        { icon: Mountain, text: 'Cliff Views' },
        { icon: Sun, text: 'Sunset Views' },
        { icon: Wifi, text: 'High-Speed WiFi' },
        { icon: Car, text: 'Private Parking' },
        { icon: Utensils, text: 'Kitchenette' },
        { icon: Crown, text: 'Premium Luxury' }
      ],
      amenities: [
        'Master suite with panoramic windows',
        'Private balcony with premium furniture',
        'Unobstructed cliff and ocean views',
        'Luxury bathroom with soaking tub',
        'Premium kitchenette with modern appliances',
        'Climate control and ceiling fans',
        'Complimentary high-speed WiFi',
        'Concierge services available'
      ],
      images: [
        'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
        'https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg',
        'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg'
      ]
    }
  };

  const currentVilla = villas[selectedVilla];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800">Exclusive Accommodation</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Luxury Villas
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose between our two exclusive villas, each offering a unique perspective 
            of Kerala's stunning coastline and unparalleled luxury amenities.
          </p>
        </div>

        <Tabs value={selectedVilla} onValueChange={(val) => setSelectedVilla(val as VillaType)} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="ground-floor">Ground Floor Villa</TabsTrigger>
            <TabsTrigger value="top-floor">Top Floor Villa</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedVilla} className="space-y-8">
            <div className="grid md:grid-cols-3 gap-4">
              {currentVilla.images.map((image, index) => (
                <div key={index} className="relative overflow-hidden rounded-lg">
                  <img
                    src={image}
                    alt={`${currentVilla.name} ${index + 1}`}
                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-3xl font-bold text-gray-900">{currentVilla.name}</h2>
                  <Badge className="bg-gradient-to-r from-blue-600 to-teal-600 text-white text-lg px-4 py-2">
                    {currentVilla.price}/night
                  </Badge>
                </div>

                <p className="text-gray-600 text-lg mb-8">{currentVilla.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {currentVilla.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
                      <feature.icon className="text-blue-600" size={20} />
                      <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white"
                >
                  Book This Villa Now
                </Button>
              </div>

              <div>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities Included</h3>
                    <ul className="space-y-3">
                      {currentVilla.amenities.map((amenity, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700">{amenity}</span>
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
