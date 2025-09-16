'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Import Lucide icons dynamically
const Shield = dynamic(() => import('lucide-react').then(mod => mod.Shield));
const Wind = dynamic(() => import('lucide-react').then(mod => mod.Wind));
const Crown = dynamic(() => import('lucide-react').then(mod => mod.Crown));
const Sparkles = dynamic(() => import('lucide-react').then(mod => mod.Sparkles));
const Coffee = dynamic(() => import('lucide-react').then(mod => mod.Coffee));
const Bath = dynamic(() => import('lucide-react').then(mod => mod.Bath));
const Refrigerator = dynamic(() =>
  import('lucide-react').then(mod => mod.Refrigerator)
);
// Replace “Hanger” with “Shirt” or another icon you like
const Shirt = dynamic(() => import('lucide-react').then(mod => mod.Shirt));
const Droplet = dynamic(() => import('lucide-react').then(mod => mod.Droplet));
const Package = dynamic(() => import('lucide-react').then(mod => mod.Package));
const Camera = dynamic(() => import('lucide-react').then(mod => mod.Camera));

export default function AmenitiesSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6" />
          <span>24/7 Security</span>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="w-6 h-6" />
          <span>AC Rooms</span>
        </div>
        <div className="flex items-center gap-2">
          <Crown className="w-6 h-6" />
          <span>Luxury Suites</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          <span>Clean & Hygienic</span>
        </div>
        <div className="flex items-center gap-2">
          <Coffee className="w-6 h-6" />
          <span>Coffee Maker</span>
        </div>
        <div className="flex items-center gap-2">
          <Bath className="w-6 h-6" />
          <span>Private Bathroom</span>
        </div>
        <div className="flex items-center gap-2">
          <Refrigerator className="w-6 h-6" />
          <span>Refrigerator</span>
        </div>
        <div className="flex items-center gap-2">
          <Shirt className="w-6 h-6" />
          <span>Wardrobe / Hangers</span>
        </div>
        <div className="flex items-center gap-2">
          <Droplet className="w-6 h-6" />
          <span>Hot & Cold Water</span>
        </div>
        <div className="flex items-center gap-2">
          <Package className="w-6 h-6" />
          <span>Luggage Assistance</span>
        </div>
        <div className="flex items-center gap-2">
          <Camera className="w-6 h-6" />
          <span>Photography Spots</span>
        </div>
      </div>
    </section>
  );
}
