// types/villa.ts
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
    description: `
Wake up to the sound of waves and gentle garden breezes. This modern 550 sq ft studio blends minimalist design with handcrafted Kerala touches and high-speed Wi-Fi for easy workations. A skylit tropical bathroom and plush king bed complete your private coastal retreat.
`,
    features: [
      { iconName: 'Bed', text: '1 Bedroom' },
      { iconName: 'Bath', text: '1 Bathroom' },
      { iconName: 'Waves', text: 'Sea Glimpse' },
      { iconName: 'Mountain', text: 'Garden Facing' },
      { iconName: 'Wifi', text: 'High-Speed WiFi' },
      { iconName: 'Shield', text: '24/7 Security' },
    ],
    amenities: [
      'Comfortable double bed',
      'Private garden-facing patio',
      'Elegant en-suite bathroom',
      'Air conditioning and ceiling fan',
      'Complimentary WiFi',
      'Daily housekeeping service',
    ],
    images: [
      '/groundfloor/2.jpg',
      '/groundfloor/8.png',
      '/groundfloor/13.jpg',
      '/groundfloor/5.jpg',
      '/groundfloor/6.jpg',
      '/groundfloor/1.png',
      '/groundfloor/7.jpg',
      '/groundfloor/9.jpg',
      '/groundfloor/10.jpg',
      '/groundfloor/11.jpg',
      '/groundfloor/12.jpg',
    ],
  },
  {
    id: 'landscape-room',
    name: 'Private Balcony with Sea View',
    description: `
Enjoy slow mornings with panoramic views of the sea and lush gardens. Bright and airy interiors combine soft tones with modern comforts, creating an inviting space to read, relax, or work. Step onto your private balcony and soak up Varkala’s coastal charm.
`,
    features: [
      { iconName: 'Bed', text: '1 Bedroom' },
      { iconName: 'Bath', text: '1 Bathroom' },
      { iconName: 'Mountain', text: 'Landscape View' },
      { iconName: 'Sun', text: 'Natural Light' },
      { iconName: 'Wifi', text: 'High-Speed WiFi' },
      { iconName: 'Car', text: 'Free Parking' },
    ],
    amenities: [
      'Large window with scenic views',
      'Cozy reading corner',
      'Modern bathroom amenities',
      'Complimentary WiFi',
      'Air conditioning',
      'Daily housekeeping',
    ],
    images: [
      '/topfloor/6.jpg',
      '/topfloor/4.jpg',
      '/topfloor/5.jpg',
      '/topfloor/2.jpg',
      '/topfloor/1.jpg',
      '/topfloor/3.jpg',
      '/topfloor/7.jpg',
      '/topfloor/8.jpg',
      '/topfloor/9.jpg',
      '/topfloor/10.jpg',
    ],
  },
  {
    id: 'luxury-landscape',
    name: 'Exclusive Villa Stay – Sea & Garden View',
    description: `
Treat your family or friends to the full villa experience with spacious sea- and garden-facing rooms. Private balconies, tropical bathrooms, and airy common spaces give you freedom to unwind at your own pace. The perfect blend of privacy, comfort, and Kerala’s natural beauty.
`,
    features: [
      { iconName: 'Bed', text: '2 Bedrooms' },
      { iconName: 'Bath', text: '2 Bathrooms' },
      { iconName: 'Waves', text: 'Sea View' },
      { iconName: 'Mountain', text: 'Garden View' },
      { iconName: 'Wifi', text: 'High-Speed WiFi' },
      { iconName: 'Crown', text: 'Exclusive Privacy' },
    ],
    amenities: [
      'Entire villa for your group',
      'Private balconies and patio',
      'Spacious common areas',
      'Full-service kitchen',
      'Butler and concierge services',
      'Daily housekeeping',
      'High-speed WiFi',
    ],
    images: [
      '/homepage.png',
      '/topfloor/1.jpg',
      '/groundfloor/2.jpg',
      '/topfloor/3.jpg',
      '/groundfloor/4.jpg',
      '/topfloor/5.jpg',
      '/groundfloor/6.jpg',
      '/topfloor/7.jpg',
    ],
  },
];

export const getVillaById = (id: string): Villa | undefined =>
  villas.find((villa) => villa.id === id);
