'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, Plane, Car } from 'lucide-react';
import Link from 'next/link';

const LocationPreview = () => {
  const themeColor = '#627d6a';

  const nearbyAttractions = [
    {
      name: 'Varkala Beach',
      distance: '0.1 km',
      time: '2 min walk',
      description: 'Direct access to pristine beach',
    },
    {
      name: 'Varkala Cliff',
      distance: '0.0 km',
      time: 'On property',
      description: 'Located on the famous South Cliff',
    },
    {
      name: 'Janardanaswamy Temple',
      distance: '1.2 km',
      time: '15 min walk',
      description: 'Ancient temple with spiritual significance',
    },
    {
      name: 'Kappil Beach',
      distance: '4.5 km',
      time: '10 min drive',
      description: 'Secluded beach with backwaters',
    },
  ];

  const transportOptions = [
    {
      icon: Plane,
      title: 'Trivandrum Airport',
      distance: '45 km',
      time: '1 hour drive',
      description: 'International airport with regular flights',
    },
    {
      icon: Car,
      title: 'Varkala Railway Station',
      distance: '2 km',
      time: '5 min drive',
      description: 'Well-connected railway station',
    },
  ];

  return (
    <section className="py-24 bg-[#f9f9f7] transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 text-[13px] py-1 px-3 rounded-full font-medium" style={{ backgroundColor: '#e1ebe5', color: themeColor }}>
            Prime Location
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2c3e32] mb-4">South Cliff, Varkala</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Perfectly positioned on the famous South Cliff of Varkala, Kerala, offering unparalleled access to beach, culture, and natural beauty.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300">
            <CardContent className="p-0">
              <div className="relative h-96 bg-gradient-to-br from-[#e1ebe5] to-white flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16" style={{ color: themeColor }} />
                  <p className="text-gray-700 font-semibold mt-4">Interactive Map</p>
                  <p className="text-sm text-gray-500">South Cliff, Varkala, Kerala</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-[#2c3e32] mb-4">Our Location</h3>
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="mt-1 flex-shrink-0" size={20} style={{ color: themeColor }} />
                <div>
                  <p className="font-medium text-gray-900">South Cliff, Varkala</p>
                  <p className="text-gray-600">Kerala, India</p>
                </div>
              </div>
              <p className="text-gray-600">
                Situated on the spectacular South Cliff of Varkala, our villas offer direct access to the pristine beach while being surrounded by natural beauty and culture.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-[#2c3e32] mb-4">Transportation</h4>
              <div className="space-y-4">
                {transportOptions.map((option, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#e1ebe5] rounded-full flex items-center justify-center flex-shrink-0">
                      <option.icon size={20} style={{ color: themeColor }} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{option.title}</p>
                      <p className="text-sm text-gray-600">{option.distance} • {option.time}</p>
                      <p className="text-sm text-gray-500">{option.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-[#2c3e32] mb-8">Nearby Attractions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nearbyAttractions.map((attraction, index) => (
              <Card
                key={index}
                className="hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border-none bg-white"
              >
                <CardContent className="p-6">
                  <h4 className="font-semibold text-[#2c3e32] mb-2">{attraction.name}</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={14} className="text-gray-500" />
                    <span className="text-sm text-gray-600">{attraction.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{attraction.distance}</p>
                  <p className="text-sm text-gray-500">{attraction.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/location">
            <Button
              size="lg"
              className="text-white font-semibold shadow-md transition duration-300 hover:shadow-xl"
              style={{ backgroundColor: themeColor }}
            >
              View Detailed Location Info
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LocationPreview;
