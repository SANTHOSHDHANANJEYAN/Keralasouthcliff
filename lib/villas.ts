export interface VillaFeature {
  iconName: string;
  text: string;
}

export interface Villa {
  id: string;
  name: string;
  description: string;
  features: VillaFeature[];
  amenities: string[];
  images: string[];
}

export const villas: Villa[] = [
  {
    id: 'sea-garden-room',
    name: 'Sea & Garden View Room',
    
    description: 'Enjoy a calming blend of lush garden surroundings with a glimpse of the sea.',
    features: [
      { iconName: 'Bed', text: '1 Bedroom' },
      { iconName: 'Bath', text: '1 Bathroom' },
      { iconName: 'Waves', text: 'Sea Glimpse' },
      { iconName: 'Mountain', text: 'Garden Facing' },
      { iconName: 'Wifi', text: 'High-Speed WiFi' },
      { iconName: 'Shield', text: '24/7 Security' }
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
      '/astega/1.jpg',
      '/astega/2.jpg',
      '/astega/3.jpg',
      '/astega/4.jpg',
      '/astega/5.jpg',
    ]
  },
  {
    id: 'landscape-room',
    name: 'Landscape View Room',
    description: 'Scenic landscape with partial sea and garden view – perfect for slow mornings.',
    features: [
      { iconName: 'Bed', text: '1 Bedroom' },
      { iconName: 'Bath', text: '1 Bathroom' },
      { iconName: 'Mountain', text: 'Landscape View' },
      { iconName: 'Sun', text: 'Natural Light' },
      { iconName: 'Wifi', text: 'High-Speed WiFi' },
      { iconName: 'Car', text: 'Free Parking' }
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
      '/astega/6.jpg',
      '/astega/7.jpg',
      '/astega/8.jpg',
      '/astega/9.jpg',
      '/astega/10.jpg',
    ]
  },
  {
    id: 'luxury-landscape',
    name: 'Exclusive Villa Stay – Sea & Garden View',
    description: 'Book the entire villa for complete privacy, with serene sea and garden-facing rooms.',
    features: [
      { iconName: 'Bed', text: '2 Bedrooms' },
      { iconName: 'Bath', text: '2 Bathrooms' },
      { iconName: 'Waves', text: 'Sea View' },
      { iconName: 'Mountain', text: 'Garden View' },
      { iconName: 'Wifi', text: 'High-Speed WiFi' },
      { iconName: 'Crown', text: 'Exclusive Privacy' }
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
      '/astega/11.jpg',
      '/astega/12.jpg',
      '/astega/13.jpg',
      '/astega/14.jpg',
      '/astega/15.jpg',
    ]
  }
];

export const getVillaById = (id: string): Villa | undefined => {
  return villas.find((villa) => villa.id === id);
};
