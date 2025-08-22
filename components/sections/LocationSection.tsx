'use client';

import React, { memo } from 'react';
import dynamic from 'next/dynamic';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock } from 'lucide-react';

// Lazy-load heavy icons for performance
const Plane = dynamic(() => import('lucide-react').then(mod => mod.Plane));
const Car = dynamic(() => import('lucide-react').then(mod => mod.Car));
const Train = dynamic(() => import('lucide-react').then(mod => mod.Train));
const Camera = dynamic(() => import('lucide-react').then(mod => mod.Camera));
const Waves = dynamic(() => import('lucide-react').then(mod => mod.Waves));
const Mountain = dynamic(() => import('lucide-react').then(mod => mod.Mountain));
const TreePine = dynamic(() => import('lucide-react').then(mod => mod.TreePine));

/* ---------------------- STATIC DATA ---------------------- */
const nearbyAttractions = [
  { name: 'Varkala Beach', distance: '0.1 km', time: '2 min walk', description: 'Direct access to pristine beach with golden sand and clear waters', icon: Waves },
  { name: 'Varkala Cliff', distance: '0.0 km', time: 'On property', description: 'Located on the famous South Cliff with stunning ocean views', icon: Mountain },
  { name: 'Janardanaswamy Temple', distance: '1.2 km', time: '15 min walk', description: 'Ancient temple with spiritual significance and beautiful architecture', icon: TreePine },
  { name: 'Kappil Beach', distance: '4.5 km', time: '10 min drive', description: 'Secluded beach where backwaters meet the Arabian Sea', icon: Waves },
  { name: 'Varkala Lighthouse', distance: '2.8 km', time: '8 min drive', description: 'Historic lighthouse offering panoramic coastal views', icon: Camera },
  { name: 'Sivagiri Mutt', distance: '3.5 km', time: '12 min drive', description: 'Important pilgrimage site and spiritual center', icon: TreePine },
];

const transportOptions = [
  { icon: Plane, title: 'Trivandrum International Airport', distance: '45 km', time: '1 hour drive', description: 'International airport with regular domestic and international flights' },
  { icon: Train, title: 'Varkala Railway Station', distance: '2 km', time: '5 min drive', description: 'Well-connected railway station on the Thiruvananthapuram-Mangalore line' },
  { icon: Car, title: 'Road Access', distance: 'Direct access', time: 'Immediate', description: 'Well-maintained roads with easy access from major Kerala cities' },
];

const locationHighlights = [
  { title: 'Cliff-top Location', description: 'Unique position on the South Cliff offering dramatic ocean views and direct beach access.' },
  { title: 'Cultural Heritage', description: 'Rich cultural surroundings with ancient temples, traditional architecture, and local festivals.' },
  { title: 'Natural Beauty', description: 'Pristine beaches, red cliffs, coconut groves, and the stunning Arabian Sea coastline.' },
  { title: 'Wellness Destination', description: 'Famous for Ayurvedic treatments, yoga retreats, and natural mineral springs.' },
];

/* ---------------------- COMPONENT ---------------------- */
const LocationSection = () => {
  return (
    <section className="py-24 bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-black text-white">Prime Location</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            South Cliff, Varkala, Kerala
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Perfectly positioned on the famous South Cliff of Varkala, Kerala, offering unparalleled access to beach, culture, and natural beauty.
          </p>
        </div>

        {/* Map + Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Embedded Map */}
          <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.6135488368222!2d76.70730627501536!3d8.728196091321585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05ef1d0df6c4e5%3A0xff88936a28adc795!2sAsteya!5e0!3m2!1sen!2sin!4v1753987144978!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer-when-downgrade"
              title="South Cliff Varkala Map"
            ></iframe>
          </div>

          {/* Location Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-black mb-4">Our Location</h3>
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="text-black mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-medium text-black">
                    Asteya, Near Perumkulam, South Cliff, Varkala - 695141
                  </p>
                  <p className="text-gray-600">Kerala, India</p>
                </div>
              </div>
              <p className="text-gray-700">
                Situated on the spectacular South Cliff of Varkala, our villas offer direct access to the pristine beach while being surrounded by natural beauty and cultural attractions.
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h4 className="text-lg font-semibold text-black mb-4">Location Highlights</h4>
              <div className="space-y-4">
                {locationHighlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-black">{highlight.title}</p>
                      <p className="text-sm text-gray-700">{highlight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Transportation */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-black mb-8 text-center">How to Reach</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {transportOptions.map((option, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-lg transition">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <option.icon className="text-black" size={24} />
                  </div>
                  <h4 className="font-semibold text-black mb-2">{option.title}</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    {option.distance} • {option.time}
                  </p>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Nearby Attractions */}
        <div>
          <h3 className="text-2xl font-bold text-black mb-8 text-center">Nearby Attractions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyAttractions.map((attraction, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-lg transition">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <attraction.icon className="text-black" size={20} />
                    </div>
                    <h4 className="font-semibold text-black">{attraction.name}</h4>
                  </div>
                  <div className="flex items-center gap-2 mb-2 text-gray-700">
                    <Clock size={14} />
                    <span className="text-sm">{attraction.time}</span>
                    <span className="text-sm">•</span>
                    <span className="text-sm">{attraction.distance}</span>
                  </div>
                  <p className="text-sm text-gray-600">{attraction.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default memo(LocationSection);
