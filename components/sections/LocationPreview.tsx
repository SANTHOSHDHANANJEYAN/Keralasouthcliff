'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, Plane, Car } from 'lucide-react';
import Image from 'next/image';

const LocationPreview = () => {
  const nearbyAttractions = [
    {
      name: 'Varkala Beach',
      distance: '0.1 km',
      time: '2 min walk',
      description: 'Direct access to pristine beach',
      image: '../asteya/Varkalabeach.jpg',
      url: 'https://en.wikipedia.org/wiki/Varkala_Beach',
    },
    {
      name: 'Varkala Cliff',
      distance: '0.0 km',
      time: 'On property',
      description: 'Located on the famous South Cliff',
      image: '../asteya/varkalacliff',
      url: 'https://en.wikipedia.org/wiki/Varkala',
    },
    {
      name: 'Janardanaswamy Temple',
      distance: '1.2 km',
      time: '15 min walk',
      description: 'Ancient temple with spiritual significance',
      image: '../asteya/temple',
      url: 'https://en.wikipedia.org/wiki/Janardanaswamy_Temple',
    },
    {
      name: 'Kappil Beach',
      distance: '4.5 km',
      time: '10 min drive',
      description: 'Secluded beach with backwaters',
      image: '../asteya/kappilbeach',
      url: 'https://en.wikipedia.org/wiki/Kappil_Beach',
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
    <section className="pt-8 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            Asteya Beach Villa South Cliff, Varkala
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Perfectly positioned on the famous South Cliff of Varkala, Kerala,
            offering unparalleled access to beach, culture, and natural beauty.
          </p>
        </div>

        {/* Map + Location */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-start">
          {/* Embedded Google Map */}
          <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition duration-300">
            <CardContent className="p-0">
              <div className="relative h-80 sm:h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.6135488368222!2d76.70730627501536!3d8.728196091321585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05ef1d0df6c4e5%3A0xff88936a28adc795!2sAsteya!5e0!3m2!1sen!2sin!4v1753987144978!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="South Cliff Varkala Map"
                ></iframe>
              </div>
            </CardContent>
          </Card>

          {/* Location Details */}
          <div className="flex flex-col justify-between space-y-10">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">Our Location</h3>
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="mt-1 text-black" size={20} />
                <div>
                  <p className="font-medium">
                    Asteya, Near Perumkulam, South Cliff, Varkala - 695141
                  </p>
                  <p className="text-gray-500 text-sm">Kerala, India</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Situated on the spectacular South Cliff of Varkala, our villas
                offer direct access to the pristine beach while being surrounded
                by natural beauty and culture.
              </p>
            </div>

            {/* Transport */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Transportation</h4>
              <div className="space-y-4">
                {transportOptions.map((option, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shrink-0">
                      <option.icon size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-medium">{option.title}</p>
                      <p className="text-sm text-gray-500">
                        {option.distance} • {option.time}
                      </p>
                      <p className="text-sm text-gray-400">
                        {option.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Nearby Attractions */}
        <div className="mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-center mb-8">
            Nearby Attractions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {nearbyAttractions.map((attraction, index) => (
              <a
                key={index}
                href={attraction.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full"
              >
                <Card className="h-full flex flex-col bg-white border border-gray-200 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300">
                  <CardContent className="p-0 flex flex-col h-full">
                    {/* Thumbnail */}
                    <div className="w-full h-40 relative">
                      <Image
                        src={attraction.image}
                        alt={attraction.name}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    {/* Text */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h4 className="font-semibold mb-2 group-hover:text-[#f4c542] transition-colors">
                        {attraction.name}
                      </h4>
                      <div className="flex items-center gap-2 mb-1">
                        <Clock size={14} className="text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {attraction.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{attraction.distance}</p>
                      <p className="text-sm text-gray-500">{attraction.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationPreview;
