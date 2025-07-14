'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, Plane, Car } from 'lucide-react';
import Link from 'next/link';

const LocationPreview = () => {
  const nearbyAttractions = [
    {
      name: 'Varkala Beach',
      distance: '0.1 km',
      time: '2 min walk',
      description: 'Direct access to pristine beach'
    },
    {
      name: 'Varkala Cliff',
      distance: '0.0 km',
      time: 'On property',
      description: 'Located on the famous South Cliff'
    },
    {
      name: 'Janardanaswamy Temple',
      distance: '1.2 km',
      time: '15 min walk',
      description: 'Ancient temple with spiritual significance'
    },
    {
      name: 'Kappil Beach',
      distance: '4.5 km',
      time: '10 min drive',
      description: 'Secluded beach with backwaters'
    }
  ];

  const transportOptions = [
    {
      icon: Plane,
      title: 'Trivandrum Airport',
      distance: '45 km',
      time: '1 hour drive',
      description: 'International airport with regular flights'
    },
    {
      icon: Car,
      title: 'Varkala Railway Station',
      distance: '2 km',
      time: '5 min drive',
      description: 'Well-connected railway station'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800">Prime Location</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            South Cliff, Varkala
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Perfectly positioned on the famous South Cliff of Varkala, Kerala, 
            offering unparalleled access to beach, culture, and natural beauty.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Map Placeholder */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-96 bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Interactive Map</p>
                  <p className="text-sm text-gray-500">South Cliff, Varkala, Kerala</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Details */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Location</h3>
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-medium text-gray-900">South Cliff, Varkala</p>
                  <p className="text-gray-600">Kerala, India</p>
                </div>
              </div>
              <p className="text-gray-600">
                Situated on the spectacular South Cliff of Varkala, our villas offer 
                direct access to the pristine beach while being surrounded by the 
                area's natural beauty and cultural attractions.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Transportation</h4>
              <div className="space-y-4">
                {transportOptions.map((option, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <option.icon className="text-blue-600" size={20} />
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

        {/* Nearby Attractions */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Nearby Attractions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nearbyAttractions.map((attraction, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">{attraction.name}</h4>
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
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white"
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