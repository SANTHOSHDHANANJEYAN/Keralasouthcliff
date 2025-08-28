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
    description: 'Wake up to the soothing charm of nature in our Sea & Garden View Room. Surrounded by lush greenery, the room offers a refreshing garden ambiance with a serene glimpse of the Arabian Sea. Designed for comfort and relaxation, it features cozy interiors, modern amenities, and a tranquil setting that invites you to unwind and reconnect with nature. Perfect for those who wish to enjoy both the calm of the garden and the beauty of the ocean.',
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
      '/astega/17-min.jpg',
      '/astega/11-min.jpg',
      '/astega/21-min.jpg',
      '/astega/4-min.jpg',
      '/astega/5-min.jpg',
      '/astega/7-min.jpg',
      '/astega/8-min.jpg',
      '/astega/12-min.jpg'
    ]
  },
  {
    id: 'landscape-room',
    name: 'Landscape View Room',
    description: 'Embrace slow mornings with the soothing charm of our Landscape View Room. Offering a scenic blend of lush gardens and a partial sea view, this room is designed for peaceful stays. Bright, airy, and thoughtfully styled with modern comforts, it creates the perfect space to relax, recharge, and enjoy the beauty of Varkala’s natural surroundings.',
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
      '/astega/14-min.jpg',
      '/astega/28-min.jpg',
      '/astega/Ateya - Living area-min.png',
      '/astega/9-min.jpg',
      '/astega/10-min.jpg',
      '/astega/16-min.jpg',
      '/astega/17-min.jpg',
      '/astega/18-min.jpg'
    ]
  },
  {
    id: 'luxury-landscape',
    name: 'Exclusive Villa Stay – Sea & Garden View',
    description: 'Experience Asteya in complete privacy with our Exclusive Villa Stay. Perfect for families, friends, or long retreats, this option gives you the entire villa with spacious sea- and garden-facing rooms. Surrounded by lush greenery and glimpses of the Arabian Sea, the villa offers a serene setting where comfort meets nature. Enjoy personalized space, modern amenities, and the freedom to unwind at your own pace.',
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
      '/astega/5-min.jpg',
      '/astega/14-min.jpg',
      '/astega/19-min.jpg',
      '/astega/15-min.jpg',
      '/astega/20-min.jpg',
      '/astega/22-min.jpg',
      '/astega/23-min.jpg',
      '/astega/24-min.jpg'
    ]
  }
];

export const getVillaById = (id: string): Villa | undefined => {
  return villas.find((villa) => villa.id === id);
};
