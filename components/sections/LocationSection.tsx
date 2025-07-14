'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, Plane, Car, Train, Navigation, Camera, Waves, Mountain, TreePine } from 'lucide-react';

const LocationSection = () => {
  const nearbyAttractions = [
    {
      name: 'Varkala Beach',
      distance: '0.1 km',
      time: '2 min walk',
      description: 'Direct access to pristine beach with golden sand and clear waters',
      icon: Waves
    },
    {
      name: 'Varkala Cliff',
      distance: '0.0 km',
      time: 'On property',
      description: 'Located on the famous South Cliff with stunning ocean views',
      icon: Mountain
    },
    {
      name: 'Janardanaswamy Temple',
      distance: '1.2 km',
      time: '15 min walk',
      description: 'Ancient temple with spiritual significance and beautiful architecture',
      icon: TreePine
    },
    {
      name: 'Kappil Beach',
      distance: '4.5 km',
      time: '10 min drive',
      description: 'Secluded beach where backwaters meet the Arabian Sea',
      icon: Waves
    },
    {
      name: 'Varkala Lighthouse',
      distance: '2.8 km',
      time: '8 min drive',
      description: 'Historic lighthouse offering panoramic coastal views',
      icon: Camera
    },
    {
      name: 'Sivagiri Mutt',
      distance: '3.5 km',
      time: '12 min drive',
      description: 'Important pilgrimage site and spiritual center',
      icon: TreePine
    }
  ];

  const transportOptions = [
    {
      icon: Plane,
      title: 'Trivandrum International Airport',
      distance: '45 km',
      time: '1 hour drive',
      description: 'International airport with regular domestic and international flights'
    },
    {
      icon: Train,
      title: 'Varkala Railway Station',
      distance: '2 km',
      time: '5 min drive',
      description: 'Well-connected railway station on the Thiruvananthapuram-Mangalore line'
    },
    {
      icon: Car,
      title: 'Road Access',
      distance: 'Direct access',
      time: 'Immediate',
      description: 'Well-maintained roads with easy access from major Kerala cities'
    }
  ];

  const locationHighlights = [
    {
      title: 'Cliff-top Location',
      description: 'Unique position on the South Cliff offering dramatic ocean views and direct beach access.'
    },
    {
      title: 'Cultural Heritage',
      description: 'Rich cultural surroundings with ancient temples, traditional architecture, and local festivals.'
    },
    {
      title: 'Natural Beauty',
      description: 'Pristine beaches, red cliffs, coconut groves, and the stunning Arabian Sea coastline.'
    },
    {
      title: 'Wellness Destination',
      description: 'Famous for Ayurvedic treatments, yoga retreats, and natural mineral springs.'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800">Prime Location</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            South Cliff, Varkala, Kerala
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Perfectly positioned on the famous South Cliff of Varkala, Kerala, 
            offering unparalleled access to beach, culture, and natural beauty.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Map Placeholder */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-96 bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Interactive Map</p>
                  <p className="text-sm text-gray-500">South Cliff, Varkala, Kerala</p>
                  <p className="text-xs text-gray-400 mt-2">8.7334° N, 76.7156° E</p>
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
                  <p className="text-gray-600">Kerala, India 695141</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Situated on the spectacular South Cliff of Varkala, our villas offer 
                direct access to the pristine beach while being surrounded by the 
                area's natural beauty and cultural attractions.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Location Highlights</h4>
              <div className="space-y-4">
                {locationHighlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">{highlight.title}</p>
                      <p className="text-sm text-gray-600">{highlight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Transportation */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">How to Reach</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {transportOptions.map((option, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <option.icon className="text-blue-600" size={24} />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{option.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{option.distance} • {option.time}</p>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Nearby Attractions */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Nearby Attractions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyAttractions.map((attraction, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                      <attraction.icon className="text-teal-600" size={20} />
                    </div>
                    <h4 className="font-semibold text-gray-900">{attraction.name}</h4>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={14} className="text-gray-500" />
                    <span className="text-sm text-gray-600">{attraction.time}</span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{attraction.distance}</span>
                  </div>
                  <p className="text-sm text-gray-500">{attraction.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;